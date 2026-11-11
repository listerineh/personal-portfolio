import { getRequestConfig } from 'next-intl/server';
import { requestLocale } from './locale';
import { isLocale } from './negotiate';
import { withTenure } from '@/lib/tenure';

export default getRequestConfig(async ({ requestLocale: segment }) => {
  // The [locale] segment (set by the layout, picked by the middleware), so pages can render statically. Without one,
  // the request's language: the visitor's choice, else their browser's, else English.
  const fromSegment = await segment;
  const locale = isLocale(fromSegment) ? fromSegment : await requestLocale();

  return {
    locale,
    // Years of experience in the copy are tokens, counted here from their start dates.
    messages: withTenure((await import(`../../messages/${locale}.json`)).default),
    timeZone: 'UTC',
  };
});
