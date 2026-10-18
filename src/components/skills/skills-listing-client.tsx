'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Skill, SkillCategory } from '@/types';
import { EndOfList, FilterTag, PageHeader, Reveal } from '@/components/ds';
import { PageShell } from '@/components/layout';

interface SkillsListingClientProps {
  skillGroups: { category: SkillCategory; skills: Skill[] }[];
}

export function SkillsListingClient({ skillGroups }: SkillsListingClientProps) {
  const t = useTranslations('skills');
  const tCommon = useTranslations('common');
  const [selectedCategories, setSelectedCategories] = useState<SkillCategory[]>([]);

  const visibleGroups = useMemo(
    () =>
      selectedCategories.length === 0
        ? skillGroups
        : skillGroups.filter((group) => selectedCategories.includes(group.category)),
    [skillGroups, selectedCategories],
  );

  const toggleCategory = (category: SkillCategory) =>
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));

  return (
    <PageShell>
      <PageHeader title={t('pageTitle')} intro={t('pageDescription')}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t('filterByCategory')}>
          <span className="text-meta mr-1 text-muted-foreground">{t('filterByCategory')}</span>
          <FilterTag pressed={selectedCategories.length === 0} onPressedChange={() => setSelectedCategories([])}>
            {t('filterAll')}
          </FilterTag>
          {skillGroups.map((group) => (
            <FilterTag
              key={group.category}
              pressed={selectedCategories.includes(group.category)}
              onPressedChange={() => toggleCategory(group.category)}
            >
              {t(`categories.${group.category}`)}
              <span className="ml-1.5 tabular-nums opacity-60">{group.skills.length}</span>
            </FilterTag>
          ))}
        </div>
      </PageHeader>

      <div className="px-gutter pb-24 pt-4 md:pb-32 md:pt-8">
        <div className="mx-auto grid max-w-[1200px] gap-16 md:gap-20">
          {visibleGroups.map((group) => (
            <section key={group.category} aria-labelledby={`cat-${group.category}`}>
              <div className="flex items-baseline gap-3">
                <h2 id={`cat-${group.category}`} className="text-subhead">
                  {t(`categories.${group.category}`)}
                </h2>
                <span className="text-meta text-muted-foreground">{group.skills.length}</span>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {group.skills.map((skill) => (
                  <Reveal as="li" key={skill.name} className="panel flex items-start gap-4 p-5">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/[0.06]">
                      {skill.iconUrl ? (
                        <Image src={skill.iconUrl} alt="" width={24} height={24} className="h-6 w-6 object-contain" unoptimized />
                      ) : (
                        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-foreground/30" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-tight">{skill.name}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </section>
          ))}
          <EndOfList>{tCommon('endOfList')}</EndOfList>
        </div>
      </div>
    </PageShell>
  );
}
