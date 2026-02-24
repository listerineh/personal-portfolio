import type { Locale } from '@/i18n/config';

export function getLocalizedData<T>(data: Record<Locale, T>, locale: Locale): T {
  return data[locale] || data['en'];
}
