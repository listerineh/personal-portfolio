import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { getSkillsByCategory } from '@/lib/data';
import { SkillsListingClient } from '@/components/skills/skills-listing-client';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';
  const skillsUrl = `${siteUrl}/skills`;

  const title = locale === 'es'
    ? 'Habilidades | Sebastian Alvarez — Ingeniero de Software Senior'
    : 'Skills | Sebastian Alvarez — Senior Software Engineer';

  const description = locale === 'es'
    ? 'Stack tecnológico completo: lenguajes, frameworks, bases de datos, cloud, IA y más herramientas que uso a diario como ingeniero full stack.'
    : 'Full tech stack: languages, frameworks, databases, cloud, AI, and other tools I use daily as a full stack engineer.';

  const keywords = locale === 'es'
    ? ['habilidades técnicas', 'stack tecnológico', 'lenguajes de programación', 'frameworks', 'cloud', 'DevOps', 'inteligencia artificial', 'Sebastian Alvarez']
    : ['technical skills', 'tech stack', 'programming languages', 'frameworks', 'cloud', 'DevOps', 'artificial intelligence', 'Sebastian Alvarez'];

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
      url: skillsUrl,
      siteName: 'listerineh.dev',
      images: [
        {
          url: `${siteUrl}/images/skills-og.webp`,
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
      images: [`${siteUrl}/images/skills-og.webp`],
      creator: '@listerineh',
      site: '@listerineh',
    },
    alternates: {
      canonical: skillsUrl,
      languages: {
        'en': `${siteUrl}/skills`,
        'es': `${siteUrl}/skills`,
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

export default async function SkillsPage() {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const skillGroups = getSkillsByCategory();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/skills`,
    'url': `${siteUrl}/skills`,
    'name': locale === 'es' ? 'Habilidades de Sebastian Alvarez' : 'Sebastian Alvarez Skills',
    'description': locale === 'es'
      ? 'Stack tecnológico y habilidades técnicas de Sebastian Alvarez'
      : 'Sebastian Alvarez technical skills and tech stack',
    'mainEntity': {
      '@type': 'Person',
      'name': 'Sebastian Alvarez',
      'url': siteUrl,
      'knowsAbout': Array.from(new Set(skillGroups.flatMap((group) => group.skills.map((skill) => skill.name)))),
    },
    'inLanguage': locale === 'es' ? 'es-ES' : 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SkillsListingClient skillGroups={skillGroups} />
    </>
  );
}
