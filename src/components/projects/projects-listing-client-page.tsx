'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Project } from '@/types';
import { Button, EndOfList, FilterTag, Reveal, PageHeader, ProjectCard, SearchField } from '@/components/ds';
import { PageShell } from '@/components/layout';

interface ProjectsListingClientPageProps {
  projects: Project[];
}

export function ProjectsListingClientPage({ projects }: ProjectsListingClientPageProps) {
  const t = useTranslations('projects');
  const tCommon = useTranslations('common');
  const tSala = useTranslations('sala');
  const tProject = useTranslations('project');

  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
      <PageHeader title={t('pageTitle')} intro={t('pageDescription')}>
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

      <section className="px-gutter pb-24 pt-4 md:pb-32 md:pt-8" aria-live="polite">
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
              {/* One simple grid: every project the same size, read left to right. */}
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {filteredProjects.map((project, index) => (
                  <Reveal as="li" key={project.id}>
                    <ProjectCard
                      slug={project.slug}
                      title={project.title}
                      description={project.description}
                      imageUrl={project.imageUrl}
                      tags={[...project.tags]}
                      headingLevel="h2"
                      priority={index < 3}
                      status={project.status}
                      statusLabel={project.status ? tProject(`status.${project.status}`) : undefined}
                      viewMoreLabel={tCommon('viewProject')}
                    />
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
