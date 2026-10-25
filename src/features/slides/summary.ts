import { locales, type Locale } from '@/i18n/config';
import { hasLanguage, localizeDeck } from './i18n';
import type { Deck, Slide } from './schema';

/** What listings need from a deck: the slide its card shows (no notes) and how to label it. Keeps full decks off the client. */
export interface DeckSummary {
  slug: string;
  title: string;
  description: string;
  lang: Deck['lang'];
  accent: string;
  event?: Deck['event'];
  updatedAt: string;
  /** The slide on the card: the talk's hook, not its title slide (see cardSlide). */
  cover: Slide;
}

/** Layouts that work as a card's picture, in order of preference: one line that says what the talk argues first. */
const CARD_LAYOUTS: Slide['layout'][] = ['statement', 'quote', 'stats'];

/**
 * The slide a listing shows. The title slide would repeat the card's title right under it, so the card shows the talk's
 * first statement instead, else a quote or its figures, and only falls back to the title slide when there's none.
 */
function cardSlide(slides: Slide[]): Slide {
  for (const layout of CARD_LAYOUTS) {
    const found = slides.find((slide) => slide.layout === layout);
    if (found) return found;
  }
  return slides[0];
}

/** A deck's summary in `lang` when it has that language, otherwise in its own. */
export function toDeckSummary(found: Deck, lang: string = found.lang): DeckSummary {
  const deck = hasLanguage(found, lang) ? localizeDeck(found, lang) : found;
  const { notes: _notes, ...cover } = cardSlide(deck.slides);
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

/** Summaries for every site language, so a client-side language switch can swap them without a round trip. */
export function deckSummariesByLocale(decks: Deck[]): Record<Locale, DeckSummary[]> {
  return Object.fromEntries(locales.map((locale) => [locale, decks.map((deck) => toDeckSummary(deck, locale))])) as Record<Locale, DeckSummary[]>;
}
