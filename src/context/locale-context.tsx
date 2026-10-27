"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { type Locale, defaultLocale, locales } from "@/i18n/config";
import { loadMessages } from '@/i18n/client-messages';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(
    initialLocale && locales.includes(initialLocale)
      ? initialLocale
      : defaultLocale,
  );

  const router = useRouter();

  const setLocale = useCallback(
    (newLocale: Locale) => {
      const apply = () => {
        setLocaleState(newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        // Screen readers pick their voice from <html lang>.
        document.documentElement.lang = newLocale;
        // Pages are prerendered per language: fetch this one's other version (the middleware picks it from the
        // cookie). The interface already switched with the client messages; server-rendered content follows.
        router.refresh();
      };
      // Switch only once the language's messages are here, so the page never shows a mix of both.
      if (newLocale === initialLocale) apply();
      else loadMessages(newLocale).then(apply, apply);
    },
    [initialLocale, router],
  );

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
