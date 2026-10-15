import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import '../src/app/globals.css';
import { ThemeProvider } from '../src/context/theme-context';
import { LocaleProvider } from '../src/context/locale-context';
import { installMockApi } from '../src/stories/support/mock-api';
import en from '../messages/en.json';
import es from '../messages/es.json';

installMockApi();

// The JSON includes arrays read via t.raw(), which AbstractIntlMessages does not model.
const messages = { en, es } as unknown as Record<'en' | 'es', AbstractIntlMessages>;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      const locale: 'en' | 'es' = context.globals.locale === 'es' ? 'es' : 'en';

      React.useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.lang = locale;
      }, [theme, locale]);

      return (
        <LocaleProvider key={locale} initialLocale={locale}>
          <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="UTC">
            <ThemeProvider>
              <Story />
            </ThemeProvider>
          </NextIntlClientProvider>
        </LocaleProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light (plaster)' },
          { value: 'dark', icon: 'moon', title: 'Dark (after hours)' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Language',
      defaultValue: 'en',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'es', title: 'Español' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
