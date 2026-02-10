import type { Metadata } from 'next';
import { Unbounded, Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/context/theme-context';
import { AnimatedBackground, SmoothScrollWrapper, BackToTopButton, CookieBanner } from '@/components/common';
import { BuildVersionSync } from '@/components/common/build-version-sync';
import { PersonSchema, WebsiteSchema, BreadcrumbSchema } from '@/components/common/schema-org';
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
  title: 'Sebastian Alvarez | Full-Stack Software Engineer & Web Developer',
  description: 'Full-stack software engineer specializing in React, Next.js, Python, and cloud technologies. View my portfolio, projects, and technical blog on modern web development.',
  generator: "Next.js",
  referrer: "origin",
  publisher: "Vercel",
  authors: [{ name: 'Sebastian Alvarez', url: 'https://listerineh.dev' }],
  creator: 'Sebastian Alvarez',
  keywords: [
    'full-stack engineer',
    'full-stack developer',
    'web developer',
    'software engineer',
    'React developer',
    'React.js',
    'Next.js expert',
    'Next.js developer',
    'Python developer',
    'Python backend',
    'Node.js developer',
    'TypeScript developer',
    'JavaScript developer',
    'web development',
    'software development',
    'cloud technologies',
    'AWS developer',
    'cloud computing',
    'modern web development',
    'responsive web design',
    'frontend development',
    'backend development',
    'full-stack web developer',
    'software engineer portfolio',
    'developer portfolio',
    'tech portfolio',
    'programming portfolio',
    'web application development',
    'REST API',
    'GraphQL',
    'database design',
    'SQL',
    'NoSQL',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'DevOps',
    'CI/CD',
    'agile development',
    'software architecture',
    'system design',
    'scalable applications',
    'performance optimization',
    'SEO optimization',
    'web performance',
    'accessibility',
    'WCAG',
    'responsive design',
    'mobile development',
    'cross-platform development',
    'technical blog',
    'coding tutorials',
    'web development blog',
    'Quito developer',
    'Ecuador software engineer',
    'Quito web developer',
    'Ecuador full-stack developer',
    'Quito tech talent',
    'Ecuador tech community',
    'Quito freelance developer',
    'Ecuador remote developer',
    'Quito software development',
    'Ecuador web development',
    'Quito programmer',
    'Ecuador programmer',
    'Quito coding',
    'Ecuador coding',
    'Quito tech professional',
    'Ecuador tech professional',
  ],
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
  openGraph: {
    title: 'Sebastian Alvarez | Full-Stack Software Engineer',
    description: 'Explore my portfolio of web development projects and technical expertise in React, Next.js, and Python',
    url: 'https://listerineh.dev',
    siteName: 'Sebastian Alvarez - Full-Stack Developer',
    images: [
      {
        url: '/images/website_screenshot.webp',
        width: 1200,
        height: 630,
        alt: 'Sebastian Alvarez Portfolio Preview - Full-Stack Developer',
        type: 'image/webp',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sebastian Alvarez | Full-Stack Software Engineer',
    description: 'Explore my portfolio of web development projects and technical expertise',
    images: [
      {
        url: '/images/website_screenshot.webp',
        width: 1200,
        height: 630,
        alt: 'Sebastian Alvarez Portfolio Preview',
      },
    ],
    creator: '@listerineh',
    site: '@listerineh',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  alternates: {
    canonical: 'https://listerineh.dev',
    languages: {
      'en-US': 'https://listerineh.dev',
    },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(fontUnbounded.variable, fontOutfit.variable)}>
      <head>
        <meta httpEquiv="cache-control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="pragma" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
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
        <BuildVersionSync />
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
