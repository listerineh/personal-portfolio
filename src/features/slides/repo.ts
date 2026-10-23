import { deckSchema, type Deck, type DeckInput } from "./schema";

/**
 * Deck persistence, free of Next.js so it can be tested directly. A backend stores each deck as its JSON document plus
 * the previous HISTORY_LIMIT versions (Firestore in production: firestore-backend.ts; memory in tests and local dev).
 *
 * Seed decks shipped in the repo are always readable; once saved, the stored copy wins.
 * Saves are compare-and-set on `version`, so two editor tabs can't silently overwrite each other.
 */

export const HISTORY_LIMIT = 20;

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

/** The few storage operations the repo needs. */
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
  /** Every stored deck's JSON, most recently updated first. */
  all(): Promise<string[]>;
  history(slug: string): Promise<string[]>;
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
    all: async () =>
      [...decks.values()]
        .sort((a, b) => b.score - a.score)
        .map(({ json }) => json),
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
      const decks = new Map<string, Deck>();
      for (const json of await backend.all()) {
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
