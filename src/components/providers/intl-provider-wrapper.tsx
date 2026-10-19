"use client";

import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { useLocale } from "@/context/locale-context";
import { loadedMessages } from "@/i18n/client-messages";
import type { Locale } from "@/i18n/config";

interface IntlProviderWrapperProps {
  children: React.ReactNode;
  initialLocale: Locale;
  initialMessages: AbstractIntlMessages;
}

export function IntlProviderWrapper({
  children,
  initialLocale,
  initialMessages,
}: IntlProviderWrapperProps) {
  const { locale } = useLocale();
  // The server's language comes with the page; the other one is loaded by setLocale before the switch happens.
  const messages =
    locale === initialLocale
      ? initialMessages
      : (loadedMessages(locale) ?? initialMessages);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      {children}
    </NextIntlClientProvider>
  );
}
