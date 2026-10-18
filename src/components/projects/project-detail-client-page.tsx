'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useLocale } from '@/context/locale-context';
import type { Project } from '@/types';
import { stackLayers } from '@/lib/stack-layers';
import { Button, Reveal, PageHeader, Panel, StackList } from '@/components/ds';
import { PageShell } from '@/components/layout';

interface ProjectDetailClientPageProps {
  project: Project;
}

type ProjectStatus = 'completed' | 'in-progress' | 'archived' | 'on-hold';

function formatProjectDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long' });
}

/** A single work: hung large, its plaque and working drawing beside it, then the story at reading measure. */
export function ProjectDetailClientPage({ project }: ProjectDetailClientPageProps) {
  const { locale } = useLocale();
  const t = useTranslations('project');
  const tSala = useTranslations('sala');

  const status = project.status as ProjectStatus | undefined;
  const dateRange = project.startDate
    ? `${formatProjectDate(project.startDate, locale)}${project.endDate ? ` – ${formatProjectDate(project.endDate, locale)}` : ''}`
    : '';

  const backLink = (
    <Link
      href="/projects"
      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline-offset-[0.3em] hover:underline"
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      {t('backToProjects')}
    </Link>
  );

  return (
    <PageShell>
      <PageHeader title={project.title} intro={project.description} nav={backLink}>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {project.liveDemoUrl && (
            <Button accent="amber" size="lg" href={project.liveDemoUrl} external className="w-full sm:w-auto">
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              {t('liveDemo')}
            </Button>
          )}
          {project.sourceCodeUrl && (
            <Button variant="secondary" size="lg" href={project.sourceCodeUrl} external className="w-full sm:w-auto">
              <Github aria-hidden="true" className="h-4 w-4" />
              {t('sourceCode')}
            </Button>
          )}
        </div>
      </PageHeader>

      <section className="px-gutter py-16 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-12 lg:gap-6">
          {project.imageUrl && (
            <Reveal className="lg:col-span-8">
              <div className="overflow-hidden rounded-xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image src={project.imageUrl} alt={project.title} fill priority sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
                </div>
              </div>
            </Reveal>
          )}

          <div className="grid content-start gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <Panel>
              <dl className="grid gap-4">
                {project.role && (
                  <div>
                    <dt className="text-meta text-muted-foreground">{t('role')}</dt>
                    <dd className="mt-1 font-semibold">{project.role}</dd>
                  </div>
                )}
                {dateRange && (
                  <div>
                    <dt className="sr-only">{t('dates')}</dt>
                    <dd className="text-meta">{dateRange}</dd>
                  </div>
                )}
                {status && (
                  <div>
                    <dt className="sr-only">{t("statusLabel")}</dt>
                    <dd>
                      <span
                        className={
                          status === 'in-progress'
                            ? 'inline-flex h-6 items-center bg-primary px-2 font-mono text-[0.6875rem] font-medium text-primary-foreground'
                            : 'inline-flex h-6 items-center border border-foreground/40 px-2 font-mono text-[0.6875rem] font-medium'
                        }
                      >
                        {t(`status.${status}`)}
                      </span>
                    </dd>
                  </div>
                )}
              </dl>
            </Panel>
            {project.tags.length > 0 && (
              <StackList
                caption={`${t('technologies')} · ${tSala('drawingCaption')}`}
                layers={stackLayers(project.tags).map(({ layer, items }) => ({ name: tSala(`layers.${layer}`), items }))}
              />
            )}
          </div>
        </div>
      </section>

      {(project.longDescription || project.relevance) && (
        <section className="px-gutter pb-20 md:pb-32">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-6">
            {project.longDescription && (
              <div className="lg:col-span-7">
                <h2 className="text-subhead">{t('aboutProject')}</h2>
                <div className="mt-6 grid max-w-[68ch] gap-5 text-[1.0625rem] leading-[1.7] text-foreground/90">
                  {project.longDescription.split('\n\n').map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            {project.relevance && (
              <aside className="lg:col-span-4 lg:col-start-9 lg:pt-16">
                <h2 className="text-headline">{t('relevance')}</h2>
                <p className="text-lead mt-3 text-muted-foreground">{project.relevance}</p>
              </aside>
            )}
          </div>
          <div className="mx-auto mt-16 max-w-[1200px] border-t border-foreground/20 pt-6">{backLink}</div>
        </section>
      )}
    </PageShell>
  );
}
