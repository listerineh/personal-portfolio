import { Metadata } from 'next';
import { getProject } from '@/lib/data/projects';
import { notFound } from 'next/navigation';
import { ProjectDetailClientPage } from '@/components/projects/project-detail-client-page';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const project = getProject(slug, locale);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';
  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const imageUrl = project.imageUrl ? `${siteUrl}${project.imageUrl}` : `${siteUrl}/og-default.png`;
  
  const ogLocale = locale === 'es' ? 'es_ES' : 'en_US';
  const alternateLocale = locale === 'es' ? 'en' : 'es';

  return {
    title: `${project.title} | Sebastian Alvarez`,
    description: project.description,
    authors: [{ name: 'Sebastian Alvarez', url: siteUrl }],
    creator: 'Sebastian Alvarez',
    publisher: 'Sebastian Alvarez',
    keywords: project.tags,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: projectUrl,
      siteName: 'listerineh.dev',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: ogLocale,
      alternateLocale: alternateLocale === 'es' ? 'es_ES' : 'en_US',
      type: 'article',
      publishedTime: project.startDate ? new Date(project.startDate).toISOString() : undefined,
      modifiedTime: project.endDate ? new Date(project.endDate).toISOString() : (project.startDate ? new Date(project.startDate).toISOString() : undefined),
      authors: ['Sebastian Alvarez'],
      tags: project.tags,
      section: project.tags[0] ?? 'Engineering',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [imageUrl],
      creator: '@listerineh',
      site: '@listerineh',
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const project = getProject(slug, locale);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClientPage project={project} />;
}
