'use client';

import { useTranslations } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { useLocale } from '@/context/locale-context';
import { cn } from '@/lib/utils';

/** Two-state language control: EN / ES as text, the current one set solid. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const t = useTranslations('language');

  const switchLocale = (next: Locale) => {
    if (next !== locale) setLocale(next);
  };

  return (
    <div role="group" aria-label={t('switchLanguage')} className={cn('inline-flex h-11 items-center', className)}>
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          lang={loc}
          onClick={() => switchLocale(loc)}
          aria-pressed={locale === loc}
          aria-label={localeNames[loc]}
          className={cn(
            'inline-flex h-11 min-w-11 items-center justify-center px-2 font-mono text-xs font-semibold uppercase transition-colors duration-snap ease-snap',
            locale === loc ? 'text-foreground underline decoration-2 underline-offset-[0.45em]' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
