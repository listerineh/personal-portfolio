import { Metadata, Viewport } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;

  const baseMetadata = generatePageMetadata('why', locale);

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
      title: 'Listerineh',
    },
  };
}

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
