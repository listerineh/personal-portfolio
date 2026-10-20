import type { Metadata } from 'next';
import { requestLocale, shareMetadata } from '@/lib/metadata';
import { getProject, getProjects } from '@/lib/data/projects';
import { notFound } from 'next/navigation';
import { ProjectDetailClientPage, type ProjectVersion } from '@/components/projects/project-detail-client-page';
import { locales, type Locale } from '@/i18n/config';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await requestLocale();
  const project = getProject(slug, locale);
  if (!project) return { title: locale === 'es' ? 'Proyecto no encontrado' : 'Project not found', robots: { index: false } };

  return shareMetadata({
    title: project.title,
    description: project.description,
    keywords: project.tags,
    path: `/projects/${project.slug}`,
    // Generated per project by scripts/generate-og-images.js (name + product shot).
    image: `/og/projects/${project.slug}.png`,
    imageAlt: project.title,
    locale,
    type: 'article',
    publishedTime: project.startDate ? new Date(project.startDate).toISOString() : undefined,
    modifiedTime: project.endDate ? new Date(project.endDate).toISOString() : undefined,
    tags: project.tags,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const locale = await requestLocale();
  if (!getProject(slug, locale)) {
    notFound();
  }

  // Both languages travel with the page so the client-side language switch translates it in place;
  // each version knows which project comes next in its own list.
  const versions = Object.fromEntries(
    locales.map((loc) => {
      const list = getProjects(loc);
      const index = list.findIndex((item) => item.slug === slug);
      const next = index === -1 ? undefined : list[(index + 1) % list.length];
      return [
        loc,
        {
          project: list[index],
          next: next && next.slug !== slug ? { slug: next.slug, title: next.title, description: next.description, imageUrl: next.imageUrl } : undefined,
        },
      ];
    }),
  ) as Record<Locale, ProjectVersion>;

  return <ProjectDetailClientPage versions={versions} initialLocale={locale} />;
}
