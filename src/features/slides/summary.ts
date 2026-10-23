import { locales, type Locale } from '@/i18n/config';
import { hasLanguage, localizeDeck } from './i18n';
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

/** A deck's summary in `lang` when it has that language, otherwise in its own. */
export function toDeckSummary(found: Deck, lang: string = found.lang): DeckSummary {
  const deck = hasLanguage(found, lang) ? localizeDeck(found, lang) : found;
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

/** Summaries for every site language, so a client-side language switch can swap them without a round trip. */
export function deckSummariesByLocale(decks: Deck[]): Record<Locale, DeckSummary[]> {
  return Object.fromEntries(locales.map((locale) => [locale, decks.map((deck) => toDeckSummary(deck, locale))])) as Record<Locale, DeckSummary[]>;
}
