import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/metadata';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AboutContent } from '@/components/sections/about-content';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale)
    ? savedLocale
    : defaultLocale) as Locale;

  const baseMetadata = generatePageMetadata('about', locale);

  return {
    ...baseMetadata,
    authors: [{ name: 'Sebastian Alvarez', url: 'https://listerineh.dev' }],
    creator: 'Sebastian Alvarez',
    publisher: 'Listerineh',
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'About — Listerineh',
    },
  };
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow pt-20">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
