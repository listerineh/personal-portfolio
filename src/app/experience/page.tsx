import { Metadata } from 'next';
import { getExperiences } from '@/lib/data';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { ExperienceListingClient } from '@/components/experience/experience-listing-client';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';
  const experienceUrl = `${siteUrl}/experience`;

  const title = locale === 'es'
    ? 'Experiencia | Sebastian Alvarez — Ingeniero de Software Senior'
    : 'Experience | Sebastian Alvarez — Senior Software Engineer';

  const description = locale === 'es'
    ? 'Trayectoria profesional completa: roles, empresas y responsabilidades a lo largo de mi carrera como ingeniero de software full stack.'
    : 'Full career journey: roles, companies, and responsibilities throughout my career as a full stack software engineer.';

  const keywords = locale === 'es'
    ? ['experiencia laboral', 'trayectoria profesional', 'ingeniero de software', 'carrera', 'desarrollo full stack', 'Sebastian Alvarez']
    : ['work experience', 'career journey', 'software engineer', 'career', 'full stack development', 'Sebastian Alvarez'];

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
      url: experienceUrl,
      siteName: 'listerineh.dev',
      images: [
        {
          url: `${siteUrl}/images/projects-og.webp`,
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
      images: [`${siteUrl}/images/projects-og.webp`],
      creator: '@listerineh',
      site: '@listerineh',
    },
    alternates: {
      canonical: experienceUrl,
      languages: {
        'en': `${siteUrl}/experience`,
        'es': `${siteUrl}/experience`,
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

export default async function ExperiencePage() {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const experiences = getExperiences(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/experience`,
    'url': `${siteUrl}/experience`,
    'name': locale === 'es' ? 'Experiencia de Sebastian Alvarez' : 'Sebastian Alvarez Experience',
    'description': locale === 'es'
      ? 'Trayectoria profesional y experiencia laboral de Sebastian Alvarez'
      : 'Sebastian Alvarez professional career and work experience',
    'mainEntity': {
      '@type': 'Person',
      'name': 'Sebastian Alvarez',
      'url': siteUrl,
      'sameAs': [
        'https://github.com/listerineh',
        'https://twitter.com/listerineh',
        'https://linkedin.com/in/listerineh',
      ],
      'hasOccupation': experiences.map((exp) => ({
        '@type': 'Occupation',
        'name': exp.jobTitle,
        'occupationLocation': exp.location ? { '@type': 'Place', 'name': exp.location } : undefined,
        'estimatedSalary': undefined,
        'hiringOrganization': {
          '@type': 'Organization',
          'name': exp.company,
        },
      })),
    },
    'inLanguage': locale === 'es' ? 'es-ES' : 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ExperienceListingClient experiences={experiences} />
    </>
  );
}
