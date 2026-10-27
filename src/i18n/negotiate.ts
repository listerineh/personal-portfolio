import { defaultLocale, locales, type Locale } from './config';

// Pure language negotiation, shared by the middleware (which picks the [locale] segment to serve) and requestLocale.

export const isLocale = (value: string | undefined): value is Locale => !!value && (locales as readonly string[]).includes(value);

/**
 * The best supported language in an Accept-Language header ("es-EC,es;q=0.9,en;q=0.8" → "es"), by quality, then
 * order. Null when none is supported or the header is missing (crawlers usually send none and get the default).
 */
export function fromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return { language: tag.trim().toLowerCase().split('-')[0], quality: q ? Number(q.slice(2)) : 1, index };
    })
    .filter((entry) => entry.language && entry.language !== '*' && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);
  return ranked.map((entry) => entry.language).find(isLocale) ?? null;
}

/** The language to serve: the visitor's choice (NEXT_LOCALE cookie), else their browser's language, else English. */
export function negotiateLocale(saved: string | undefined, acceptLanguage: string | null | undefined): Locale {
  if (isLocale(saved)) return saved;
  return fromAcceptLanguage(acceptLanguage) ?? defaultLocale;
}
