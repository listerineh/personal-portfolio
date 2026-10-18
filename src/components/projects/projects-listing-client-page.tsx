'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Project } from '@/types';
import { Button, EndOfList, FilterTag, Reveal, PageHeader, ProjectCard, SearchField } from '@/components/ds';
import { projectStatusDot, type ProjectStatus } from '@/components/ds/ProjectCard';
import { cn } from '@/lib/utils';

const STATUS_ORDER: ProjectStatus[] = ['in-progress', 'completed', 'on-hold', 'archived'];
import { PageShell } from '@/components/layout';

interface ProjectsListingClientPageProps {
  projects: Project[];
}

export function ProjectsListingClientPage({ projects }: ProjectsListingClientPageProps) {
  const t = useTranslations('projects');
  const tCommon = useTranslations('common');
  const tProject = useTranslations('project');

  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState<ProjectStatus | null>(null);

  const allTags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(), [projects]);
  const statuses = useMemo(
    () => STATUS_ORDER.filter((value) => projects.some((project) => project.status === value)),
    [projects],
  );
  const selected = useMemo(() => new Set(selectedTags), [selectedTags]);
  const filtering = search.trim() !== '' || selectedTags.length > 0 || status !== null;

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesTags = selected.size === 0 || project.tags.some((tag) => selected.has(tag));
      const matchesStatus = status === null || project.status === status;
      return matchesSearch && matchesTags && matchesStatus;
    });
  }, [projects, search, selected, status]);

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((value) => value !== tag) : [...prev, tag]));

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setStatus(null);
  };

  // Unfiltered, the newest project leads across the whole row; while filtering every result is an equal card.
  const [lead, ...rest] = filtering ? [undefined, ...filteredProjects] : filteredProjects;

  const card = (project: Project, index: number, wide = false) => (
    <ProjectCard
      slug={project.slug}
      title={project.title}
      description={project.description}
      imageUrl={project.imageUrl}
      tags={[...project.tags]}
      headingLevel="h2"
      layout={wide ? 'wide' : 'card'}
      priority={index < 2}
      status={project.status}
      statusLabel={project.status ? tProject(`status.${project.status}`) : undefined}
      viewMoreLabel={tCommon('viewProject')}
    />
  );

  return (
    <PageShell>
      <PageHeader ambient title={t('pageTitle')} intro={t('pageDescription')}>
        <div className="grid gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <SearchField
              value={search}
              onChange={setSearch}
              placeholder={t('searchPlaceholder')}
              label={t('searchPlaceholder')}
              clearLabel={t('clearFilters')}
              className="md:flex-1"
            />
            {statuses.length > 1 && (
              <div
                role="group"
                aria-label={t('statusFilter')}
                className="inline-flex h-12 shrink-0 items-center gap-1 self-start rounded-full bg-foreground/[0.06] p-1 md:self-auto"
              >
                {[null, ...statuses].map((value) => (
                  <button
                    key={value ?? 'all'}
                    type="button"
                    aria-pressed={status === value}
                    onClick={() => setStatus(value)}
                    className={cn(
                      'inline-flex h-full items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium',
                      'transition-[background-color,color,box-shadow] duration-snap ease-snap motion-reduce:transition-none',
                      status === value ? 'bg-background text-foreground shadow-card' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {value && <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', projectStatusDot[value])} />}
                    {value ? tProject(`status.${value}`) : t('filterAll')}
                  </button>
                ))}
              </div>
            )}
          </div>

          {allTags.length > 0 && (
            <div className="marquee-edges -mx-gutter overflow-x-auto px-gutter scrollbar-none">
              <div role="group" aria-label={t('technologies')} className="flex w-max gap-2 py-1">
                {allTags.map((tag) => (
                  <FilterTag key={tag} pressed={selected.has(tag)} onPressedChange={() => toggleTag(tag)}>
                    {tag}
                  </FilterTag>
                ))}
              </div>
            </div>
          )}

          <div className="flex min-h-9 items-center gap-3">
            <p className="text-meta text-muted-foreground" aria-live="polite">
              {t('showing', { shown: filteredProjects.length, total: projects.length })}
            </p>
            {filtering && (
              <Button variant="ghost" accent="amber" size="sm" onClick={clearFilters}>
                {t('clearFilters')}
              </Button>
            )}
          </div>
        </div>
      </PageHeader>

      <section className="px-gutter pb-24 pt-2 md:pb-32 md:pt-4">
        <div className="mx-auto max-w-[1200px]">
          {filteredProjects.length === 0 ? (
            <div className="panel max-w-xl p-6 md:p-8">
              <p className="text-headline">{t('noResults')}</p>
              <Button variant="secondary" onClick={clearFilters} className="mt-6">
                {t('clearFilters')}
              </Button>
            </div>
          ) : (
            <>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {lead && (
                  <Reveal as="li" className="sm:col-span-2 lg:col-span-3">
                    {card(lead, 0, true)}
                  </Reveal>
                )}
                {rest.filter((project): project is Project => Boolean(project)).map((project, index) => (
                  <Reveal as="li" key={project.id}>
                    {card(project, index + 1)}
                  </Reveal>
                ))}
              </ul>
              <EndOfList>{tCommon('endOfList')}</EndOfList>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
