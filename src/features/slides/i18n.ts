import { DECK_LANGS, SHARED_SLIDE_FIELDS, type Deck, type DeckLang, type Slide } from './schema';

/**
 * One deck, two languages. The base deck is written in `deck.lang`; a translation keeps, per slide, only the fields
 * that differ (see schema.ts). These helpers turn that into what each side needs: the deck in a given language for the
 * viewer, and the overlay to store when the editor changes a translated slide.
 */

/** The deck's languages, its own first. */
export function deckLanguages(deck: Deck): DeckLang[] {
  return [deck.lang, ...DECK_LANGS.filter((lang) => lang !== deck.lang && deck.translations?.[lang])];
}

export function hasLanguage(deck: Deck, lang: string): lang is DeckLang {
  return (deckLanguages(deck) as string[]).includes(lang);
}

/**
 * The deck as shown in `lang`: translated title, description and slide fields over the base, untranslated slides in
 * the base language. A language the deck doesn't have gives the base deck. The result is for showing, not saving.
 */
export function localizeDeck(deck: Deck, lang: DeckLang): Deck {
  const translation = lang === deck.lang ? undefined : deck.translations?.[lang];
  if (!translation) return deck;
  return {
    ...deck,
    lang,
    title: translation.title ?? deck.title,
    description: translation.description ?? deck.description,
    slides: deck.slides.map((slide) => ({ ...slide, ...translation.slides[slide.id] }) as Slide),
  };
}

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/** What a translation has to store for `edited`: the fields that differ from the base slide (undefined when none). */
export function slideOverlay(base: Slide, edited: Slide): Record<string, unknown> | undefined {
  const baseRecord = base as unknown as Record<string, unknown>;
  const editedRecord = edited as unknown as Record<string, unknown>;
  const overlay: Record<string, unknown> = {};
  for (const key of new Set([...Object.keys(baseRecord), ...Object.keys(editedRecord)])) {
    if ((SHARED_SLIDE_FIELDS as readonly string[]).includes(key)) continue;
    if (!same(baseRecord[key], editedRecord[key])) overlay[key] = editedRecord[key];
  }
  return Object.keys(overlay).length ? overlay : undefined;
}

/** Applies an edit made while showing `lang` back onto the stored deck: the base itself, or that language's overlay. */
export function applySlideEdit(deck: Deck, lang: DeckLang, index: number, edited: Slide): Deck {
  if (lang === deck.lang) return { ...deck, slides: deck.slides.map((slide, i) => (i === index ? edited : slide)) };
  const base = deck.slides[index];
  const translation = deck.translations?.[lang] ?? { slides: {} };
  const overlay = slideOverlay(base, edited);
  const { [base.id]: _previous, ...others } = translation.slides;
  return {
    ...deck,
    translations: { ...deck.translations, [lang]: { ...translation, slides: overlay ? { ...others, [base.id]: overlay } : others } },
  };
}

/** How many slides a language has its own text for. */
export function translationProgress(deck: Deck, lang: DeckLang): { translated: number; total: number } {
  const slides = deck.translations?.[lang]?.slides ?? {};
  return { translated: deck.slides.filter((slide) => slides[slide.id]).length, total: deck.slides.length };
}
