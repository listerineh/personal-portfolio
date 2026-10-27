import { metadataFor } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import { getSkillsByCategory } from '@/lib/data/skills';
import { SkillsListingClient } from '@/components/skills/skills-listing-client';

export const generateMetadata = metadataFor('skills');

/** Static: prerendered in both languages. */
export default async function SkillsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
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
