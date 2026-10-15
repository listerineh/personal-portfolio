'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { stackLayers } from '@/lib/stack-layers';
import { Button, Hang, ProjectCard, Room, WorkingDrawing } from '@/components/ds';
import { cn } from '@/lib/utils';
import { liveProjectSlug } from '@/lib/project-status';

/** Room 01 · Work. The three latest works, hung off-grid on purpose. */
import type { ProjectSummary } from "@/types";

export function ProjectsSection({ projects }: { projects: ProjectSummary[] }) {
  const t = useTranslations('projects');
  const tSala = useTranslations('sala');
  const tCommon = useTranslations('common');
  const tProject = useTranslations('project');
  const hung = projects.slice(0, 3);
  const liveSlug = liveProjectSlug(hung);
  const [feature, ...rest] = hung;

  return (
    <Room
      id="work"
      number="01"
      name={tSala('work')}
      title={t('title')}
      aside={
        <Button variant="ghost" href="/projects">
          {t('viewAll')}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      {feature && (
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <Hang className="lg:col-span-8">
            <ProjectCard
              slug={feature.slug}
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
              tags={[...feature.tags]}
              number="01"
              size="feature"
              liveLabel={feature.slug === liveSlug ? tProject('status.in-progress') : undefined}
              statusLabel={feature.status === 'in-progress' ? tProject('status.in-progress') : undefined}
              viewMoreLabel={tCommon('viewProject')}
            />
          </Hang>
          <WorkingDrawing
            caption={tSala('drawingCaption')}
            layers={stackLayers(feature.tags).map(({ layer, items }) => ({ name: tSala(`layers.${layer}`), items }))}
            className="max-w-xs lg:col-span-3 lg:col-start-10 lg:mt-24"
          />
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-6">
          {rest.map((project, index) => (
            <Hang
              key={project.id}
              className={cn(index === 0 ? 'md:col-span-5' : 'md:col-span-5 md:col-start-8 md:mt-32')}
            >
              <ProjectCard
                slug={project.slug}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                tags={[...project.tags]}
                number={String(index + 2).padStart(2, '0')}
                liveLabel={project.slug === liveSlug ? tProject('status.in-progress') : undefined}
                statusLabel={project.status === 'in-progress' ? tProject('status.in-progress') : undefined}
                viewMoreLabel={tCommon('viewProject')}
              />
            </Hang>
          ))}
        </div>
      )}
    </Room>
  );
}
