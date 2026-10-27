import { getRequestConfig } from 'next-intl/server';
import { requestLocale } from './locale';
import { isLocale } from './negotiate';

export default getRequestConfig(async ({ requestLocale: segment }) => {
  // The [locale] segment (set by the layout, picked by the middleware), so pages can render statically. Without one,
  // the request's language: the visitor's choice, else their browser's, else English.
  const fromSegment = await segment;
  const locale = isLocale(fromSegment) ? fromSegment : await requestLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'UTC',
  };
});
