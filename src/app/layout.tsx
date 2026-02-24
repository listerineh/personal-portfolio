import { getMessages } from 'next-intl/server';
import { LocaleProvider } from '@/context/locale-context';
import { IntlProviderWrapper } from '@/components/providers/intl-provider-wrapper';
import { Unbounded, Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/context/theme-context';
import { AnimatedBackground, SmoothScrollWrapper, BackToTopButton, CookieBanner } from '@/components/common';
import { PersonSchema, WebsiteSchema, BreadcrumbSchema } from '@/components/common/schema-org';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { generatePageMetadata } from '@/lib/metadata';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import type { Metadata } from 'next';

import './globals.css';

const fontUnbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  weight: ['400', '500', '600', '700'],
});

const fontOutfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

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
  return (
    <html lang="en" className={cn(fontUnbounded.variable, fontOutfit.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3F51B5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <PersonSchema />
        <WebsiteSchema />
        <BreadcrumbSchema />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
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
        {process.env.NEXT_PUBLIC_HOTJAR_SCRIPT && (
          <script src={process.env.NEXT_PUBLIC_HOTJAR_SCRIPT} />
        )}
      </head>
      <body className="font-body antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
              }
            `,
          }}
        />
        <LocaleProvider>
          <IntlProviderWrapper initialMessages={messages}>
            <ThemeProvider>
              <AnimatedBackground />
              <SmoothScrollWrapper>
                {children}
              </SmoothScrollWrapper>
              <BackToTopButton />
              <CookieBanner />
              <Analytics /> 
            </ThemeProvider>
          </IntlProviderWrapper>
        </LocaleProvider>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
