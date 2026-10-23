import { bundledLanguages, createHighlighter, type BundledLanguage, type Highlighter } from 'shiki';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import type { Deck } from './schema';
import type { CodeTokens, DeckHighlights } from './code-tokens';

/**
 * Code highlighting for code slides, on the server only: shiki never reaches the browser. Each token carries its
 * color for both slide themes and the slide CSS picks one, so switching light/dark needs no new highlighting.
 * The JavaScript regex engine avoids loading WebAssembly in serverless functions.
 */

const THEMES = { light: 'github-light', dark: 'github-dark' } as const;

let highlighter: Promise<Highlighter> | undefined;

function getHighlighter(): Promise<Highlighter> {
  highlighter ??= createHighlighter({ themes: Object.values(THEMES), langs: [], engine: createJavaScriptRegexEngine() });
  return highlighter;
}

const isBundled = (lang: string): lang is BundledLanguage => Object.hasOwn(bundledLanguages, lang);

export async function highlightCode(code: string, language: string): Promise<CodeTokens> {
  const shiki = await getHighlighter();
  const lang = isBundled(language) ? language : 'text';
  if (lang !== 'text' && !shiki.getLoadedLanguages().includes(lang)) await shiki.loadLanguage(lang);
  return shiki.codeToTokensWithThemes(code, { lang, themes: THEMES }).map((line) =>
    line.map((token) => ({ t: token.content, l: token.variants.light?.color, d: token.variants.dark?.color })),
  );
}

/** Highlights every code slide of a deck; a slide that fails is left plain rather than failing the page. */
export async function highlightDeck(deck: Deck): Promise<DeckHighlights> {
  const entries = await Promise.all(
    deck.slides.map(async (slide) =>
      slide.layout === 'code' ? ([slide.id, await highlightCode(slide.code, slide.language).catch(() => null)] as const) : null,
    ),
  );
  return Object.fromEntries(entries.filter((entry): entry is readonly [string, CodeTokens] => !!entry?.[1]));
}
