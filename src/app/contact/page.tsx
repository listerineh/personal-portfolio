import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { ContactListingClient } from '@/components/contact/contact-listing-client';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';
  const contactUrl = `${siteUrl}/contact`;

  const title = locale === 'es'
    ? 'Contacto | Sebastian Alvarez — Ingeniero de Software Senior'
    : 'Contact | Sebastian Alvarez — Senior Software Engineer';

  const description = locale === 'es'
    ? '¿Tienes un proyecto, una pregunta o una oportunidad? Contáctame directamente por correo, redes sociales o el formulario de contacto.'
    : 'Have a project, a question, or an opportunity? Reach out directly via email, social media, or the contact form.';

  const keywords = locale === 'es'
    ? ['contacto', 'contratar ingeniero de software', 'formulario de contacto', 'Sebastian Alvarez', 'colaboración']
    : ['contact', 'hire software engineer', 'contact form', 'Sebastian Alvarez', 'collaboration'];

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Sebastian Alvarez', url: siteUrl }],
    creator: 'Sebastian Alvarez',
    publisher: 'Sebastian Alvarez',
    openGraph: {
      title,
      description,
      url: contactUrl,
      siteName: 'listerineh.dev',
      images: [
        {
          url: `${siteUrl}/images/contact-og.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/images/contact-og.webp`],
      creator: '@listerineh',
      site: '@listerineh',
    },
    alternates: {
      canonical: contactUrl,
      languages: {
        'en': `${siteUrl}/contact`,
        'es': `${siteUrl}/contact`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

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
