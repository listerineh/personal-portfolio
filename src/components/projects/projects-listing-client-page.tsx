'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Project } from '@/types';
import { Button, EndOfList, FilterTag, Hang, PageHeader, ProjectCard, SearchField } from '@/components/ds';
import { PageShell } from '@/components/layout';
import { cn } from '@/lib/utils';
import { liveProjectSlug } from '@/lib/project-status';

interface ProjectsListingClientPageProps {
  projects: Project[];
}

// Hang pattern for a 12-column wall: one large work, then two smaller ones off-grid.
const HANG = ['md:col-span-8', 'md:col-span-5', 'md:col-span-5 md:col-start-8 md:mt-32'] as const;

export function ProjectsListingClientPage({ projects }: ProjectsListingClientPageProps) {
  const t = useTranslations('projects');
  const tCommon = useTranslations('common');
  const tSala = useTranslations('sala');
  const tProject = useTranslations('project');

  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const liveSlug = useMemo(() => liveProjectSlug(projects), [projects]);
  const allTags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(), [projects]);
  const selected = useMemo(() => new Set(selectedTags), [selectedTags]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesTags = selected.size === 0 || project.tags.some((tag) => selected.has(tag));
      return matchesSearch && matchesTags;
    });
  }, [projects, search, selected]);

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((value) => value !== tag) : [...prev, tag]));

  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
  };

  return (
    <PageShell>
      <PageHeader number="01" name={tSala('work')} title={t('pageTitle')} intro={t('pageDescription')}>
        <div className="grid max-w-3xl gap-5">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder={t('searchPlaceholder')}
            label={t('searchPlaceholder')}
            clearLabel={t('clearFilters')}
          />
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label={tSala('craft')}>
              {allTags.map((tag) => (
                <FilterTag key={tag} pressed={selected.has(tag)} onPressedChange={() => toggleTag(tag)}>
                  {tag}
                </FilterTag>
              ))}
            </div>
          )}
        </div>
      </PageHeader>

      <section className="px-gutter py-16 md:py-24" aria-live="polite">
        <div className="mx-auto max-w-[1296px]">
          {filteredProjects.length === 0 ? (
            <div className="plaque max-w-xl p-6 md:p-8">
              <p className="text-headline">{t('noResults')}</p>
              <Button variant="secondary" onClick={clearFilters} className="mt-6">
                {t('clearFilters')}
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-16 md:grid-cols-12 md:gap-x-6 md:gap-y-24">
                {filteredProjects.map((project, index) => {
                  const slot = index % 3;
                  return (
                    <Hang key={project.id} className={cn(HANG[slot])}>
                      <ProjectCard
                        slug={project.slug}
                        title={project.title}
                        description={project.description}
                        imageUrl={project.imageUrl}
                        tags={[...project.tags]}
                        number={String(index + 1).padStart(2, '0')}
                        size={slot === 0 ? 'feature' : 'default'}
                        headingLevel="h2"
                        priority={index === 0}
                        liveLabel={project.slug === liveSlug ? tProject('status.in-progress') : undefined}
                statusLabel={project.status === 'in-progress' ? tProject('status.in-progress') : undefined}
                        viewMoreLabel={tCommon('viewProject')}
                      />
                    </Hang>
                  );
                })}
              </div>
              <EndOfList>{tCommon('endOfList')}</EndOfList>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
