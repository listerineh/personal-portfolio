import type { Deck } from './schema';

/** The deck as the audience gets it: speaker notes never leave the server, on screen or in print. */
export function forAudience(deck: Deck): Deck {
  return { ...deck, slides: deck.slides.map(({ notes: _notes, ...slide }) => slide) };
}
