'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Button, Reveal, Section } from '@/components/ds';
import type { SkillGroupSummary } from '@/types';

/** Craft: the stack grouped by category, each group a panel of chips. */
export function SkillsSection({ groups }: { groups: SkillGroupSummary[] }) {
  const t = useTranslations('skills');

  return (
    <Section
      id="craft"
      title={t('title')}
      intro={t('description')}
      aside={
        <Button variant="ghost" accent="amber" href="/skills">
          {t('viewAll')}
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      <ul className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {groups.map(({ category, names }) => (
          <Reveal as="li" key={category} className="panel p-6">
            <h3 className="text-headline">{t(`categories.${category}`)}</h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {names.map((name) => (
                <li
                  key={name}
                  className="inline-flex h-8 items-center rounded-full bg-background px-3 text-[0.8125rem] font-medium text-foreground shadow-card"
                >
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
