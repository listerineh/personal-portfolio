import { cookies, headers } from 'next/headers';
import type { Locale } from './config';
import { negotiateLocale } from './negotiate';

export { fromAcceptLanguage, isLocale } from './negotiate';

/**
 * The language a request is rendered in: the visitor's choice (NEXT_LOCALE cookie, set by the switcher) first, then
 * their browser's language on a first visit, then English. URLs never change; only people get Spanish by default,
 * crawlers keep indexing English.
 */
export async function requestLocale(): Promise<Locale> {
  return negotiateLocale((await cookies()).get('NEXT_LOCALE')?.value, (await headers()).get('accept-language'));
}
