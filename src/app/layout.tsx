import type { Metadata } from 'next';
import { Unbounded, Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/context/theme-context';
import { AnimatedBackground, SmoothScrollWrapper, BackToTopButton, CookieBanner } from '@/components/common';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev'),
  title: 'Sebastian Alvarez | Full-Stack Software Engineer',
  description: 'Portfolio showcasing Sebastian Alvarez\'s expertise in modern web development, including React, Next.js, Node.js, and cloud technologies. View projects, experience, and technical blog.',
  generator: "Next.js",
  referrer: "origin",
  publisher: "Vercel",
  authors: [{ name: 'Sebastian Alvarez', url: 'https://listerineh.dev' }],
  keywords: ['software engineer', 'web developer', 'portfolio', 'React', 'Next.js', 'Node.js'],
  openGraph: {
    title: 'Sebastian Alvarez | Full-Stack Software Engineer',
    description: 'Professional portfolio showcasing web development projects and technical expertise',
    url: 'https://listerineh.dev',
    siteName: 'Sebastian Alvarez Portfolio',
    images: [
      {
        url: '/images/website_screenshot.webp',
        width: 1200,
        height: 630,
        alt: 'Sebastian Alvarez Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Sebastian Alvarez | Full-Stack Software Engineer',
    description: 'Professional portfolio showcasing web development projects and technical expertise',
    images: [
      {
        url: '/images/website_screenshot.webp',
        width: 1200,
        height: 630,
        alt: 'Sebastian Alvarez Portfolio Preview',
      },
    ],
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(fontUnbounded.variable, fontOutfit.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <AnimatedBackground />
          <SmoothScrollWrapper>
            {children}
          </SmoothScrollWrapper>
          <BackToTopButton />
          <CookieBanner />
          <Analytics /> 
        </ThemeProvider>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
