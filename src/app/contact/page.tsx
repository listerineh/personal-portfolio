import { metadataFor } from '@/lib/metadata';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { ContactListingClient } from '@/components/contact/contact-listing-client';

export const dynamic = 'force-dynamic';

export const generateMetadata = metadataFor('contact');

export default async function ContactPage() {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteUrl}/contact`,
    'url': `${siteUrl}/contact`,
    'name': locale === 'es' ? 'Contacto de Sebastian Alvarez' : 'Sebastian Alvarez Contact',
    'description': locale === 'es'
      ? 'Página de contacto de Sebastian Alvarez'
      : 'Sebastian Alvarez contact page',
    'mainEntity': {
      '@type': 'Person',
      'name': 'Sebastian Alvarez',
      'url': siteUrl,
      'email': 'sebask8er.alvarez@gmail.com',
      'sameAs': [
        'https://github.com/listerineh',
        'https://linkedin.com/in/listerineh',
        'https://instagram.com/__listerineh',
      ],
    },
    'inLanguage': locale === 'es' ? 'es-ES' : 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactListingClient />
    </>
  );
}
