import { cookies, headers } from 'next/headers';
import { defaultLocale, locales, type Locale } from './config';

const isLocale = (value: string | undefined): value is Locale => !!value && (locales as readonly string[]).includes(value);

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

/**
 * The language a request is rendered in: the visitor's choice (NEXT_LOCALE cookie, set by the switcher) first, then
 * their browser's language on a first visit, then English. URLs never change; only people get Spanish by default,
 * crawlers keep indexing English.
 */
export async function requestLocale(): Promise<Locale> {
  const saved = (await cookies()).get('NEXT_LOCALE')?.value;
  if (isLocale(saved)) return saved;
  return fromAcceptLanguage((await headers()).get('accept-language')) ?? defaultLocale;
}
