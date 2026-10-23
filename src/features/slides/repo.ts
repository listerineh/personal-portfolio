import type { Redis } from "@upstash/redis";
import { deckSchema, type Deck, type DeckInput } from "./schema";

/**
 * Deck persistence, free of Next.js so it can be tested directly. Decks live in Redis:
 * - slides:deck:<slug>     the current JSON document
 * - slides:index           sorted set of slugs by last update (ms)
 * - slides:history:<slug>  the previous HISTORY_LIMIT versions, newest first
 *
 * Seed decks shipped in the repo are always readable; once saved, the stored copy wins.
 * Saves are compare-and-set on `version`, so two editor tabs can't silently overwrite each other.
 */

export const HISTORY_LIMIT = 20;

const deckKey = (slug: string) => `slides:deck:${slug}`;
const historyKey = (slug: string) => `slides:history:${slug}`;
const INDEX_KEY = "slides:index";

export class VersionConflictError extends Error {
  constructor(
    readonly slug: string,
    readonly currentVersion: number,
  ) {
    super(
      `Deck "${slug}" changed elsewhere (now at version ${currentVersion})`,
    );
    this.name = "VersionConflictError";
  }
}

export type CasResult = { ok: true } | { ok: false; currentVersion: number };

/** The few storage operations the repo needs; Redis in production, memory in tests and local dev without Redis. */
export interface DeckBackend {
  get(slug: string): Promise<string | null>;
  /** Atomically: if the stored version equals `expectedVersion` (-1 = must not exist), archive it and write `json`. */
  compareAndSet(
    slug: string,
    expectedVersion: number,
    json: string,
    updatedAtMs: number,
  ): Promise<CasResult>;
  remove(slug: string): Promise<void>;
  slugs(): Promise<string[]>;
  history(slug: string): Promise<string[]>;
}

// KEYS: deck, history, index · ARGV: expectedVersion, json, score, slug, historyLimit
const CAS_SCRIPT = `
local current = redis.call('GET', KEYS[1])
local expected = tonumber(ARGV[1])
if current then
  local version = cjson.decode(current)['version']
  if version ~= expected then return version end
  redis.call('LPUSH', KEYS[2], current)
  redis.call('LTRIM', KEYS[2], 0, tonumber(ARGV[5]) - 1)
elseif expected ~= -1 then
  return -1
end
redis.call('SET', KEYS[1], ARGV[2])
redis.call('ZADD', KEYS[3], tonumber(ARGV[3]), ARGV[4])
return 'OK'
`;

export function redisBackend(redis: Redis): DeckBackend {
  return {
    // Upstash parses JSON values by default; ask for the raw string so parsing stays in one place.
    get: async (slug) => {
      const value = await redis.get<unknown>(deckKey(slug));
      return value == null
        ? null
        : typeof value === "string"
          ? value
          : JSON.stringify(value);
    },
    async compareAndSet(slug, expectedVersion, json, updatedAtMs) {
      const result = await redis.eval<string[], string | number>(
        CAS_SCRIPT,
        [deckKey(slug), historyKey(slug), INDEX_KEY],
        [
          String(expectedVersion),
          json,
          String(updatedAtMs),
          slug,
          String(HISTORY_LIMIT),
        ],
      );
      return result === "OK"
        ? { ok: true }
        : { ok: false, currentVersion: Number(result) };
    },
    async remove(slug) {
      await Promise.all([
        redis.del(deckKey(slug), historyKey(slug)),
        redis.zrem(INDEX_KEY, slug),
      ]);
    },
    slugs: () => redis.zrange<string[]>(INDEX_KEY, 0, -1, { rev: true }),
    history: async (slug) => {
      const items = await redis.lrange<unknown>(
        historyKey(slug),
        0,
        HISTORY_LIMIT - 1,
      );
      return items.map((item) =>
        typeof item === "string" ? item : JSON.stringify(item),
      );
    },
  };
}

export function memoryBackend(): DeckBackend {
  const decks = new Map<string, { json: string; score: number }>();
  const histories = new Map<string, string[]>();
  return {
    get: async (slug) => decks.get(slug)?.json ?? null,
    async compareAndSet(slug, expectedVersion, json, updatedAtMs) {
      const current = decks.get(slug);
      if (current) {
        const version = (JSON.parse(current.json) as Deck).version;
        if (version !== expectedVersion)
          return { ok: false, currentVersion: version };
        histories.set(
          slug,
          [current.json, ...(histories.get(slug) ?? [])].slice(
            0,
            HISTORY_LIMIT,
          ),
        );
      } else if (expectedVersion !== -1) {
        return { ok: false, currentVersion: -1 };
      }
      decks.set(slug, { json, score: updatedAtMs });
      return { ok: true };
    },
    async remove(slug) {
      decks.delete(slug);
      histories.delete(slug);
    },
    slugs: async () =>
      [...decks.entries()]
        .sort((a, b) => b[1].score - a[1].score)
        .map(([slug]) => slug),
    history: async (slug) => histories.get(slug) ?? [],
  };
}

const byRecency = (a: Deck, b: Deck) =>
  (b.event?.date ?? b.updatedAt).localeCompare(a.event?.date ?? a.updatedAt);

export interface DeckRepo {
  /** Any deck, drafts included: for the owner only. */
  get(slug: string): Promise<Deck | undefined>;
  /** Every deck, stored and seed, newest first: for the owner only. */
  list(): Promise<Deck[]>;
  /**
   * Validates and stores a deck. `expectedVersion` is the version the editor loaded (null for a new deck); the saved
   * deck gets the next version and a fresh `updatedAt`. Throws VersionConflictError when someone saved in between.
   */
  save(
    input: DeckInput,
    expectedVersion: number | null,
    now?: Date,
  ): Promise<Deck>;
  remove(slug: string): Promise<void>;
  /** Previous versions, newest first. */
  history(slug: string): Promise<Deck[]>;
}

export function createDeckRepo(
  backend: DeckBackend,
  seeds: readonly Deck[] = [],
): DeckRepo {
  const seedBySlug = new Map(seeds.map((deck) => [deck.slug, deck]));
  const parse = (json: string) => deckSchema.parse(JSON.parse(json));

  async function get(slug: string): Promise<Deck | undefined> {
    const json = await backend.get(slug);
    return json ? parse(json) : seedBySlug.get(slug);
  }

  return {
    get,
    async list() {
      const stored = await Promise.all(
        (await backend.slugs()).map((slug) => backend.get(slug)),
      );
      const decks = new Map<string, Deck>();
      for (const json of stored) {
        if (!json) continue;
        const deck = parse(json);
        decks.set(deck.slug, deck);
      }
      for (const seed of seeds)
        if (!decks.has(seed.slug)) decks.set(seed.slug, seed);
      return [...decks.values()].sort(byRecency);
    },
    async save(input, expectedVersion, now = new Date()) {
      // What the editor must have loaded: the stored version, a seed's own version, or nothing for a new deck.
      const stored = await backend.get(input.slug);
      const seed = stored ? undefined : seedBySlug.get(input.slug);
      if (seed && expectedVersion !== seed.version) throw new VersionConflictError(input.slug, seed.version);
      if (!stored && !seed && expectedVersion !== null) throw new VersionConflictError(input.slug, -1);

      const deck = deckSchema.parse({ ...input, version: (expectedVersion ?? 0) + 1, updatedAt: now.toISOString() });
      // A seed was never written, so its first save is a create; a stored deck must still be at the loaded version.
      const casExpected = stored ? (expectedVersion ?? -1) : -1;
      const result = await backend.compareAndSet(deck.slug, casExpected, JSON.stringify(deck), now.getTime());
      if (!result.ok) throw new VersionConflictError(deck.slug, result.currentVersion);
      return deck;
    },
    remove: (slug) => backend.remove(slug),
    async history(slug) {
      return (await backend.history(slug)).map(parse);
    },
  };
}
