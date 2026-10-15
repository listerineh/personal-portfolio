'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Skill, SkillCategory } from '@/types';
import { EndOfList, FilterTag, PageHeader } from '@/components/ds';
import { PageShell } from '@/components/layout';

interface SkillsListingClientProps {
  skillGroups: { category: SkillCategory; skills: Skill[] }[];
}

export function SkillsListingClient({ skillGroups }: SkillsListingClientProps) {
  const t = useTranslations('skills');
  const tCommon = useTranslations('common');
  const tSala = useTranslations('sala');
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
      <PageHeader number="04" name={tSala('craft')} title={t('pageTitle')} intro={t('pageDescription')}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t('filterByCategory')}>
          <span className="text-catalog mr-1 text-muted-foreground">{t('filterByCategory')}</span>
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
              <span className="ml-1.5 opacity-75">{group.skills.length}</span>
            </FilterTag>
          ))}
        </div>
      </PageHeader>

      <div className="px-gutter py-16 md:py-24">
        <div className="mx-auto grid max-w-[1296px] gap-16 md:gap-20">
          {visibleGroups.map((group) => (
            <section
              key={group.category}
              aria-labelledby={`cat-${group.category}`}
              className="grid gap-6 border-t border-foreground/25 pt-6 lg:grid-cols-12 lg:gap-6"
            >
              <div className="lg:col-span-3">
                <h2 id={`cat-${group.category}`} className="text-subhead lg:sticky lg:top-24">
                  {t(`categories.${group.category}`)}
                </h2>
                <p className="text-catalog mt-2 text-muted-foreground">{group.skills.length}</p>
              </div>
              <ul className="grid gap-x-6 sm:grid-cols-2 lg:col-span-9">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="flex items-start gap-3 border-b border-foreground/15 py-4">
                    {skill.iconUrl ? (
                      <Image src={skill.iconUrl} alt="" width={24} height={24} className="mt-0.5 h-6 w-6 shrink-0 object-contain" unoptimized />
                    ) : (
                      <span aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 border border-foreground/30" />
                    )}
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-tight">{skill.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
                    </div>
                  </li>
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
