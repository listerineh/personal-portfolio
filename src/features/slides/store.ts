import { parseDeck, type Deck } from './schema';
import { testPresentation } from './decks/test-presentation';

/**
 * Deck storage. Phase 1 reads seed decks from the repo; phase 2 swaps this for Upstash Redis behind the same functions.
 * Seeds are validated once, at module load, so a broken seed fails loudly in dev and in the build.
 */
const seeds: Deck[] = [parseDeck(testPresentation)];
const bySlug = new Map(seeds.map((deck) => [deck.slug, deck]));

/** A deck anyone can open: published or unlisted. Drafts stay private (owner access arrives with auth). */
export async function getPublicDeck(slug: string): Promise<Deck | undefined> {
  const deck = bySlug.get(slug);
  return deck && deck.status !== 'draft' ? deck : undefined;
}

/** Published decks, newest first, for listings and the sitemap. */
export async function listPublishedDecks(): Promise<Deck[]> {
  return seeds
    .filter((deck) => deck.status === 'published')
    .sort((a, b) => (b.event?.date ?? b.updatedAt).localeCompare(a.event?.date ?? a.updatedAt));
}
