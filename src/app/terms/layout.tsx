import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;

  const baseMetadata = generatePageMetadata('terms', locale);

  return {
    ...baseMetadata,
    authors: [{ name: 'Sebastian Alvarez', url: 'https://listerineh.dev' }],
    creator: 'Sebastian Alvarez',
    publisher: 'Listerineh',
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
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
