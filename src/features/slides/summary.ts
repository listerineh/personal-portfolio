import type { Deck, Slide } from './schema';

/** What listings need from a deck: its cover slide (no notes) and how to label it. Keeps full decks off the client. */
export interface DeckSummary {
  slug: string;
  title: string;
  description: string;
  lang: Deck['lang'];
  accent: string;
  event?: Deck['event'];
  updatedAt: string;
  cover: Slide;
}

export function toDeckSummary(deck: Deck): DeckSummary {
  const { notes: _notes, ...cover } = deck.slides[0];
  return {
    slug: deck.slug,
    title: deck.title,
    description: deck.description,
    lang: deck.lang,
    accent: deck.accent,
    event: deck.event,
    updatedAt: deck.updatedAt,
    cover,
  };
}
