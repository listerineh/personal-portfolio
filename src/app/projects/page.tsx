import { Metadata } from 'next';
import { getProjects } from '@/lib/data/projects';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { ProjectsListingClientPage } from '@/components/projects/projects-listing-client-page';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';
  const projectsUrl = `${siteUrl}/projects`;

  const title = locale === 'es'
    ? 'Proyectos | Sebastian Alvarez — Desarrollo Full Stack & IA'
    : 'Projects | Sebastian Alvarez — Full Stack Development & AI';

  const description = locale === 'es'
    ? 'Portafolio de proyectos de desarrollo de software: aplicaciones web, herramientas de IA, plataformas de gestión y más. Experiencia real con Next.js, React, Python y tecnologías modernas.'
    : 'Software development projects portfolio: web applications, AI tools, management platforms and more. Real-world experience with Next.js, React, Python and modern technologies.';

  const keywords = locale === 'es'
    ? ['portafolio proyectos', 'desarrollo software', 'aplicaciones web', 'inteligencia artificial', 'Next.js', 'React', 'Python', 'proyectos open source', 'Sebastian Alvarez']
    : ['projects portfolio', 'software development', 'web applications', 'artificial intelligence', 'Next.js', 'React', 'Python', 'open source projects', 'Sebastian Alvarez'];

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
      url: projectsUrl,
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
      canonical: projectsUrl,
      languages: {
        'en': `${siteUrl}/projects`,
        'es': `${siteUrl}/projects`,
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
