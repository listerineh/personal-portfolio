'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { getSkillsByCategory } from '@/lib/data/skills';
import { Button, Room } from '@/components/ds';

/** Room 04 · Craft. The stack as a catalog index by category: read it, don't watch it scroll. */
export function SkillsSection() {
  const t = useTranslations('skills');
  const tSala = useTranslations('sala');
  const groups = getSkillsByCategory().slice(0, 6);

  return (
    <Room
      id="craft"
      number="04"
      name={tSala('craft')}
      title={t('title')}
      intro={t('description')}
      tone="paint"
      aside={
        <Button variant="ghost" href="/skills">
          {t('viewAll')}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      <dl className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ category, skills }) => (
          <div key={category} className="border-t border-foreground/25 pt-4">
            <dt className="text-headline">{t(`categories.${category}`)}</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                {skills.slice(0, 10).map((skill) => (
                  <li key={skill.name} className="text-catalog text-muted-foreground">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Room>
  );
}
