import { metadataFor } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import { ContactListingClient } from '@/components/contact/contact-listing-client';

export const generateMetadata = metadataFor('contact');

/** Static: prerendered in both languages. */
export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
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
