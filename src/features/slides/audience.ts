import type { DeckHighlights } from './code-tokens';
import { highlightDeck } from './highlight';
import { deckLanguages, localizeDeck } from './i18n';
import type { Deck, DeckLang } from './schema';

/**
 * The deck as the audience gets it, in one language: speaker notes never leave the server (on screen or in print),
 * and neither do the other language's texts and notes (`translations`).
 */
export function forAudience(deck: Deck, lang: DeckLang = deck.lang): Deck {
  const localized = localizeDeck(deck, lang);
  return { ...localized, translations: undefined, slides: localized.slides.map(({ notes: _notes, ...slide }) => slide) };
}

export interface AudienceVersion {
  deck: Deck;
  highlights: DeckHighlights;
}

export type AudienceVersions = Partial<Record<DeckLang, AudienceVersion>>;

/** Every language of a deck, ready for the viewer: audience-safe and with its code highlighted. */
export async function audienceVersions(deck: Deck): Promise<AudienceVersions> {
  const entries = await Promise.all(
    deckLanguages(deck).map(async (lang) => {
      const version = forAudience(deck, lang);
      return [lang, { deck: version, highlights: await highlightDeck(version) }] as const;
    }),
  );
  return Object.fromEntries(entries);
}
