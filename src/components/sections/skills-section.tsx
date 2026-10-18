'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Button, FilterTag, Marquee, Reveal, Section, SkillTile } from '@/components/ds';
import { skillCategoryOrder } from '@/lib/data/skill-categories';
import type { SkillCategory, SkillIconSummary } from '@/types';

/**
 * Skills: the whole stack drifting by in two rows that run in opposite directions. Picking a category below
 * pauses the rows and fades out everything outside it, so the stack can be read by area.
 */
export function SkillsSection({ skills }: { skills: SkillIconSummary[] }) {
  const t = useTranslations('skills');
  const [active, setActive] = useState<SkillCategory | null>(null);

  // Alternate skills between the rows so each row mixes areas instead of splitting them.
  const [rowA, rowB] = useMemo(
    () => [skills.filter((_, i) => i % 2 === 0), skills.filter((_, i) => i % 2 === 1)],
    [skills],
  );
  const categories = useMemo(
    () => skillCategoryOrder.filter((category) => skills.some((skill) => skill.categories.includes(category))),
    [skills],
  );

  const tiles = (row: SkillIconSummary[]) =>
    row.map((skill) => (
      <SkillTile
        key={skill.name}
        name={skill.name}
        iconUrl={skill.iconUrl}
        dimmed={active !== null && !skill.categories.includes(active)}
      />
    ));

  return (
    <Section
      ambient={{ halos: false }}
      tone="tint"
      id="craft"
      title={t('title')}
      intro={t('description')}
      bleed
      aside={
        <Button variant="ghost" accent="amber" href="/skills">
          {t('viewAll')}
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      <Reveal className="grid gap-2">
        <Marquee label={t('title')} duration={rowA.length * 2.6} paused={active !== null}>
          {tiles(rowA)}
        </Marquee>
        <Marquee label={t('title')} duration={rowB.length * 2.6} paused={active !== null} reverse>
          {tiles(rowB)}
        </Marquee>
      </Reveal>

      <div className="mx-auto mt-10 max-w-[1200px] px-gutter md:mt-12">
        <div role="group" aria-label={t('filterLabel')} className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <FilterTag
              key={category}
              pressed={active === category}
              onPressedChange={(pressed) => setActive(pressed ? category : null)}
            >
              {t(`categories.${category}`)}
            </FilterTag>
          ))}
        </div>
      </div>
    </Section>
  );
}
