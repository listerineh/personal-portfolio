'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Button, Carousel, ProjectCard, Reveal, Section } from '@/components/ds';
import { liveProjectSlug } from '@/lib/project-status';
import type { ProjectSummary } from '@/types';

/** Work: the latest projects on a horizontal shelf that runs off the edge, so the next one always peeks in. */
export function ProjectsSection({ projects }: { projects: ProjectSummary[] }) {
  const t = useTranslations('projects');
  const tSala = useTranslations('sala');
  const tCommon = useTranslations('common');
  const tProject = useTranslations('project');
  const liveSlug = liveProjectSlug(projects);

  return (
    <Section
      id="work"
      tone="tint"
      title={t('title')}
      bleed
      aside={
        <Button variant="ghost" accent="amber" href="/projects">
          {t('viewAll')}
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      <Reveal>
        <Carousel label={t('title')} previousLabel={tSala('previous')} nextLabel={tSala('next')}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              slug={project.slug}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={[...project.tags]}
              priority={index === 0}
              liveLabel={project.slug === liveSlug ? tProject('status.in-progress') : undefined}
              statusLabel={project.status === 'in-progress' ? tProject('status.in-progress') : undefined}
              viewMoreLabel={tCommon('viewProject')}
            />
          ))}
        </Carousel>
      </Reveal>
    </Section>
  );
}
