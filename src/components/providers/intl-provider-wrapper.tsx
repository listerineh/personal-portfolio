'use client';

import { useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from '@/context/locale-context';
import enMessages from '../../../messages/en.json';
import esMessages from '../../../messages/es.json';

interface IntlProviderWrapperProps {
  children: React.ReactNode;
  initialMessages: any;
}

const messagesMap = {
  en: enMessages,
  es: esMessages,
} as const;

export function IntlProviderWrapper({ children, initialMessages }: IntlProviderWrapperProps) {
  const { locale } = useLocale();
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    const newMessages = messagesMap[locale as keyof typeof messagesMap];
    if (newMessages) {
      setMessages(newMessages);
    }
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
