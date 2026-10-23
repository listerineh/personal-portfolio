import { revalidateTag, unstable_cache } from "next/cache";
import { getRedis } from "@/lib/server/security";
import { parseDeck, type Deck, type DeckInput } from "./schema";
import {
  createDeckRepo,
  memoryBackend,
  redisBackend,
  type DeckRepo,
} from "./repo";
import { testPresentation } from "./decks/test-presentation";

/**
 * Server-side entry point for decks. Public reads are cached per deck and invalidated on save; owner reads and writes
 * go straight to storage. Writes are not exposed anywhere until the owner-only editor routes call them (with auth).
 */

// Seeds are validated once, at module load, so a broken seed fails loudly in dev and in the build.
const seeds: Deck[] = [parseDeck(testPresentation)];

let repo: DeckRepo | undefined;
function decks(): DeckRepo {
  if (repo) return repo;
  const redis = getRedis();
  if (!redis && process.env.NODE_ENV === "production") {
    console.warn(
      "[slides] No Redis configured: decks are read from repo seeds and saves last until the server restarts.",
    );
  }
  repo = createDeckRepo(redis ? redisBackend(redis) : memoryBackend(), seeds);
  return repo;
}

export const deckTag = (slug: string) => `deck:${slug}`;
const LIST_TAG = "decks";

const isPublic = (deck: Deck | undefined): deck is Deck =>
  !!deck && deck.status !== "draft";

/** A deck anyone can open: published or unlisted. Drafts stay private. */
export async function getPublicDeck(slug: string): Promise<Deck | undefined> {
  const cached = unstable_cache(
    async () => {
      const deck = await decks().get(slug);
      return isPublic(deck) ? deck : null;
    },
    ["slides", "public-deck", slug],
    { tags: [deckTag(slug)] },
  );
  return (await cached()) ?? undefined;
}

/** Published decks, newest first, for listings and the sitemap. */
export const listPublishedDecks = unstable_cache(
  async (): Promise<Deck[]> =>
    (await decks().list()).filter((deck) => deck.status === "published"),
  ["slides", "published-decks"],
  { tags: [LIST_TAG] },
);

// ── Owner only: callers must have checked the session (requireOwner) ──────────

export const getDeckForOwner = (slug: string) => decks().get(slug);
export const listDecksForOwner = () => decks().list();
export const deckHistory = (slug: string) => decks().history(slug);

export async function saveDeck(
  input: DeckInput,
  expectedVersion: number | null,
): Promise<Deck> {
  const deck = await decks().save(input, expectedVersion);
  revalidateTag(deckTag(deck.slug));
  revalidateTag(LIST_TAG);
  return deck;
}

export async function deleteDeck(slug: string): Promise<void> {
  await decks().remove(slug);
  revalidateTag(deckTag(slug));
  revalidateTag(LIST_TAG);
}
