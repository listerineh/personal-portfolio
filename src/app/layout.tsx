import { getMessages } from 'next-intl/server';
import { LocaleProvider } from '@/context/locale-context';
import { IntlProviderWrapper } from '@/components/providers/intl-provider-wrapper';
import { Geist, Geist_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/context/theme-context';
import { BackToTopButton, CookieBanner, ScrollRestoration, SoftNavigation } from '@/components/common';
import { PersonSchema, WebsiteSchema, BreadcrumbSchema } from '@/components/common/schema-org';
import { Toaster } from '@/components/ds';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AUTHOR_NAME, pageMetadata, requestLocale, SITE_NAME, SITE_URL, TITLE_TEMPLATE } from '@/lib/metadata';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import Script from 'next/script';

import './globals.css';

// Geist carries the whole voice; tracking tightens as size grows (see .text-* in globals.css).
const fontSans = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

// Code only.
const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// Before first paint: restore the saved theme (cookie or localStorage) and opt into reveal states.
// Without JS or with reduced motion, content stays visible.
const prePaintScript = `try{var d=document.documentElement,m=document.cookie.match(/(?:^|; )theme=(light|dark)/),t=(m&&m[1])||localStorage.getItem('theme');if(t==='dark')d.classList.add('dark');if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('js-motion')}catch(e){}`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await requestLocale();
  const home = pageMetadata('home', locale);

  return {
    ...home,
    metadataBase: new URL(SITE_URL),
    // Pages set short titles ("Projects"); the template adds the name. Home sets an absolute title.
    title: { default: (home.title as { absolute: string }).absolute, template: TITLE_TEMPLATE },
    applicationName: SITE_NAME,
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
    category: 'technology',
    referrer: 'origin-when-cross-origin',
    formatDetection: { email: false, telephone: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: 'default' },
    manifest: '/manifest.json',
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  // Set per request by src/middleware.ts; every inline or third-party script below carries it (CSP).
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const initialLocale = await requestLocale();

  return (
    <html lang={initialLocale} className={cn(fontSans.variable, fontMono.variable)} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFFFFF" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
        {/* Browsers hide nonce attributes from the DOM after parsing; suppress the resulting hydration mismatch. */}
        <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: prePaintScript }} />
        <PersonSchema />
        <WebsiteSchema />
        <BreadcrumbSchema />
      </head>
      <body className="font-sans antialiased">
        <LocaleProvider initialLocale={initialLocale}>
          <IntlProviderWrapper initialLocale={initialLocale} initialMessages={messages}>
            <ThemeProvider>
              <ScrollRestoration />
              <SoftNavigation />
              {children}
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
          nonce={nonce}
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
              nonce={nonce}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              nonce={nonce}
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
            nonce={nonce}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
