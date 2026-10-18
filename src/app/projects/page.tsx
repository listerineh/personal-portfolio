import { metadataFor } from '@/lib/metadata';
import { getProjects } from '@/lib/data/projects';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { ProjectsListingClientPage } from '@/components/projects/projects-listing-client-page';

export const dynamic = 'force-dynamic';

export const generateMetadata = metadataFor('projects');

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const projects = getProjects(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/projects`,
    'url': `${siteUrl}/projects`,
    'name': locale === 'es' ? 'Proyectos de Sebastian Alvarez' : 'Sebastian Alvarez Projects',
    'description': locale === 'es'
      ? 'Portafolio de proyectos de desarrollo de software y aplicaciones web'
      : 'Software development projects and web applications portfolio',
    'author': {
      '@type': 'Person',
      'name': 'Sebastian Alvarez',
      'url': siteUrl,
      'sameAs': [
        'https://github.com/listerineh',
        'https://twitter.com/listerineh',
        'https://linkedin.com/in/listerineh',
      ],
    },
    'publisher': {
      '@type': 'Person',
      'name': 'Sebastian Alvarez',
      'url': siteUrl,
    },
    'hasPart': projects.map(project => ({
      '@type': 'CreativeWork',
      '@id': `${siteUrl}/projects/${project.slug}`,
      'url': `${siteUrl}/projects/${project.slug}`,
      'name': project.title,
      'description': project.description,
      'dateCreated': project.startDate,
      'dateModified': project.endDate || project.startDate,
      'keywords': project.tags.join(', '),
      'applicationCategory': 'SoftwareApplication',
      'operatingSystem': 'Web',
      'offers': project.liveDemoUrl ? {
        '@type': 'Offer',
        'url': project.liveDemoUrl,
        'price': '0',
        'priceCurrency': 'USD',
      } : undefined,
      'sourceCode': project.sourceCodeUrl ? {
        '@type': 'SoftwareSourceCode',
        'url': project.sourceCodeUrl,
        'programmingLanguage': project.tags,
      } : undefined,
    })),
    'inLanguage': locale === 'es' ? 'es-ES' : 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProjectsListingClientPage projects={projects} />
    </>
  );
}
