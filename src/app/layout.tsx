import { getMessages } from 'next-intl/server';
import { LocaleProvider } from '@/context/locale-context';
import { IntlProviderWrapper } from '@/components/providers/intl-provider-wrapper';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/context/theme-context';
import { BackToTopButton, CookieBanner, ScrollRestoration } from '@/components/common';
import { PersonSchema, WebsiteSchema, BreadcrumbSchema } from '@/components/common/schema-org';
import { Toaster, RouteRail } from '@/components/ds';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { generatePageMetadata } from '@/lib/metadata';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import type { Metadata } from 'next';
import Script from 'next/script';

import './globals.css';

// Archivo carries the whole voice: Expanded (wdth 125) for wall titles, normal width for text.
const fontSans = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-sans',
  display: 'swap',
});

// Catalog data only: numbers, dates, stacks.
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// Before first paint: restore the saved theme (cookie or localStorage) and opt into reveal states.
// Without JS or with reduced motion, content stays visible.
const prePaintScript = `try{var d=document.documentElement,m=document.cookie.match(/(?:^|; )theme=(light|dark)/),t=(m&&m[1])||localStorage.getItem('theme');if(t==='dark')d.classList.add('dark');if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('js-motion')}catch(e){}`;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;

  const baseMetadata = generatePageMetadata('home', locale);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev'),
    ...baseMetadata,
    generator: "Next.js",
    referrer: "origin",
    publisher: "Vercel",
    authors: [{ name: 'Sebastian Alvarez', url: 'https://listerineh.dev' }],
    creator: 'Sebastian Alvarez',
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    },
    manifest: '/manifest.json',
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const initialLocale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;

  return (
    <html lang={initialLocale} className={cn(fontSans.variable, fontMono.variable)} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#1B2540" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#12141A" />
        <script dangerouslySetInnerHTML={{ __html: prePaintScript }} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <PersonSchema />
        <WebsiteSchema />
        <BreadcrumbSchema />
      </head>
      <body className="font-sans antialiased">
        <LocaleProvider initialLocale={initialLocale}>
          <IntlProviderWrapper initialMessages={messages}>
            <ThemeProvider>
              <ScrollRestoration />
              {children}
              <RouteRail />
              <BackToTopButton />
              <CookieBanner />
              <Toaster />
              <Analytics /> 
            </ThemeProvider>
          </IntlProviderWrapper>
        </LocaleProvider>
        <SpeedInsights />
        
        {/* Service Worker - lazy load after page is interactive */}
        <Script
          id="service-worker"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
              }
            `,
          }}
        />
        
        {/* Google Analytics - load after page is interactive */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        
        {/* Hotjar - lazy load for better performance */}
        {process.env.NEXT_PUBLIC_HOTJAR_SCRIPT && (
          <Script
            src={process.env.NEXT_PUBLIC_HOTJAR_SCRIPT}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
