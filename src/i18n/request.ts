import { getRequestConfig } from 'next-intl/server';
import { requestLocale } from './locale';

export default getRequestConfig(async () => {
  // Same rule as every page: the visitor's choice, else their browser's language, else English.
  const locale = await requestLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'UTC',
  };
});
