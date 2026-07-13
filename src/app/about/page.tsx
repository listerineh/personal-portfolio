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

  return generatePageMetadata('about', locale);
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
