'use client';

import { useTranslations } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { useLocale } from '@/context/locale-context';
import { cn } from '@/lib/utils';

/** Segmented control: EN / ES, the current one raised on a light thumb. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const t = useTranslations('language');

  const switchLocale = (next: Locale) => {
    if (next !== locale) setLocale(next);
  };

  return (
    <div role="group" aria-label={t('switchLanguage')} className={cn('inline-flex h-9 items-center rounded-full bg-foreground/[0.06] p-[3px]', className)}>
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          lang={loc}
          onClick={() => switchLocale(loc)}
          aria-pressed={locale === loc}
          aria-label={localeNames[loc]}
          className={cn(
            'inline-flex h-full min-w-10 items-center justify-center rounded-full px-2.5 text-xs font-semibold uppercase tracking-[0.02em]',
            'transition-[color,background-color,box-shadow] duration-snap ease-snap motion-reduce:transition-none',
            locale === loc ? 'bg-background text-foreground shadow-card' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
