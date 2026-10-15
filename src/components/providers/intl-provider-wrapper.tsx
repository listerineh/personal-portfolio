'use client';

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { useLocale } from '@/context/locale-context';
import enMessages from '../../../messages/en.json';
import esMessages from '../../../messages/es.json';

interface IntlProviderWrapperProps {
  children: React.ReactNode;
  initialMessages: AbstractIntlMessages;
}

const messagesMap = {
  en: enMessages,
  es: esMessages,
} as const;

export function IntlProviderWrapper({ children, initialMessages }: IntlProviderWrapperProps) {
  const { locale } = useLocale();
  // Messages follow the active locale directly; no state to keep in sync.
  // The JSON includes arrays read via t.raw(), which AbstractIntlMessages does not model.
  const messages = (messagesMap[locale as keyof typeof messagesMap] as unknown as AbstractIntlMessages | undefined) ?? initialMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      {children}
    </NextIntlClientProvider>
  );
}
