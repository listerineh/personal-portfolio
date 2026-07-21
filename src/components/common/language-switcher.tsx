'use client';

import { Check, ChevronDown } from 'lucide-react';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';
import { useLocale } from '@/context/locale-context';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@/components/ds';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setLocale(newLocale);
  };

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          aria-label="Switch language"
          className={cn(
            "flex items-center gap-1.5 px-2 h-9 rounded-md transition-colors",
            className
          )}
        >
          <span className="text-base">{localeFlags[locale]}</span>
          <span className="text-xs font-medium uppercase hidden sm:inline">{locale}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </button>
      </DropdownTrigger>
      <DropdownContent align="end" className="w-48">
        {locales.map((loc) => (
          <DropdownItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={cn(
              "gap-3 py-2.5",
              locale === loc ? "text-primary font-medium" : ""
            )}
          >
            <span className="text-lg">{localeFlags[loc]}</span>
            <span className="flex-1">{localeNames[loc]}</span>
            {locale === loc && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}
