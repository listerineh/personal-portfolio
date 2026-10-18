'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Button, ExperienceCard, Reveal, Section } from '@/components/ds';
import { isCurrentRole } from '@/lib/experience-utils';
import type { Experience } from '@/types';

/** Career: the three most recent roles; the current one carries the live tag. */
export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const t = useTranslations('experience');
  const tSala = useTranslations('sala');
  const tCommon = useTranslations('common');
  const visible = experiences.slice(0, 3);

  return (
    <Section
      id="career"
      tone="tint"
      title={t('title')}
      aside={
        experiences.length > 3 ? (
          <Button variant="ghost" accent="amber" href="/experience">
            {t('viewAll')}
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      <div className="grid gap-4 md:gap-5">
        {visible.map((exp) => (
          <Reveal key={`${exp.company}-${exp.employmentDates}`}>
            <ExperienceCard
              jobTitle={exp.jobTitle}
              company={exp.company}
              employmentDates={exp.employmentDates}
              location={exp.location}
              logoUrl={exp.logoUrl}
              responsibilities={exp.responsibilities}
              showMoreLabel={tCommon('seeMore')}
              showLessLabel={tCommon('showLess')}
              currentLabel={isCurrentRole(exp.employmentDates) ? tSala('now') : undefined}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
