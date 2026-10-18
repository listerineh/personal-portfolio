'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Skill, SkillCategory } from '@/types';
import { Ambient, EndOfList, FilterTag, PageHeader, Reveal } from '@/components/ds';
import { ArrowDown, Sparkles } from 'lucide-react';
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

  // Unique skills across categories (a skill can sit in several).
  const totalSkills = new Set(skillGroups.flatMap((group) => group.skills.map((skill) => skill.name))).size;

  return (
    <PageShell>
      <PageHeader ambient title={t('pageTitle')} intro={t('pageDescription')}>
        <div className="grid gap-4">
          <div className="marquee-edges -mx-gutter overflow-x-auto px-gutter scrollbar-none">
            <div role="group" aria-label={t('filterByCategory')} className="flex w-max gap-2 py-1">
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
          </div>
          <p className="text-meta text-muted-foreground">
            {t('summary', { skills: totalSkills, areas: skillGroups.length })}
          </p>
        </div>
      </PageHeader>

      {/* The note: the list is a starting point, not a boundary. */}
      <section aria-labelledby="transfer-title" className="px-gutter">
        <Reveal className="tint relative isolate mx-auto grid max-w-[1200px] items-center gap-8 overflow-hidden rounded-xl p-6 md:grid-cols-12 md:gap-10 md:p-10">
          <Ambient intensity="soft" grid={false} spotlight={false} />
          <div className="md:col-span-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/[0.14] text-primary">
              <Sparkles aria-hidden="true" className="h-6 w-6" />
            </span>
            <h2 id="transfer-title" className="text-subhead mt-5">
              {t('transferTitle')}
            </h2>
            <p className="mt-3 max-w-[56ch] text-[1.0625rem] leading-relaxed text-muted-foreground">{t('transferBody')}</p>
          </div>
          {/* Knowledge moving from one stack to another: decorative. */}
          <div aria-hidden="true" className="flex flex-col items-center justify-center gap-3 sm:flex-row md:col-span-5">
            <span className="panel px-4 py-3 text-[0.9375rem] font-medium shadow-card">{t('transferFrom')}</span>
            <span className="relative hidden h-px w-24 overflow-hidden bg-foreground/15 sm:block">
              <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-primary motion-safe:animate-[transfer_1.8s_var(--ease-in-out)_infinite]" />
            </span>
            <ArrowDown className="h-5 w-5 text-primary motion-safe:animate-bounce sm:hidden" />
            <span className="rounded-full bg-primary px-4 py-3 text-[0.9375rem] font-medium text-primary-foreground shadow-card">
              {t('transferTo')}
            </span>
          </div>
        </Reveal>
      </section>

      <div className="px-gutter pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="mx-auto grid max-w-[1200px] gap-16 md:gap-20">
          {visibleGroups.map((group) => (
            <section key={group.category} aria-labelledby={`cat-${group.category}`}>
              <div className="flex items-center gap-3">
                <h2 id={`cat-${group.category}`} className="text-subhead">
                  {t(`categories.${group.category}`)}
                </h2>
                <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-foreground/[0.06] px-2.5 text-xs font-semibold tabular-nums text-muted-foreground">
                  {group.skills.length}
                </span>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
                {group.skills.map((skill) => (
                  <Reveal
                    as="li"
                    key={skill.name}
                    className="panel group flex items-start gap-3.5 p-4 transition-[transform,box-shadow] duration-glide ease-glide hover:-translate-y-0.5 hover:shadow-card motion-reduce:transition-none"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/[0.06]">
                      {skill.iconUrl ? (
                        <Image src={skill.iconUrl} alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" unoptimized />
                      ) : (
                        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-foreground/30" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[0.9375rem] font-semibold leading-tight">{skill.name}</h3>
                      <p className="mt-1 line-clamp-2 text-[0.8125rem] leading-relaxed text-muted-foreground">{skill.description}</p>
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
