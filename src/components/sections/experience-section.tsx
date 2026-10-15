'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { experiencesData } from '@/lib/data';
import { getLocalizedData } from '@/lib/i18n-data';
import { useLocale } from '@/context/locale-context';
import { Button, ExperienceCard, Room } from '@/components/ds';
import { isCurrentRole } from '@/lib/experience-utils';

/** Room 03 · Career. The three most recent stops; the current one is live. */
export function ExperienceSection() {
  const t = useTranslations('experience');
  const tSala = useTranslations('sala');
  const tCommon = useTranslations('common');
  const { locale } = useLocale();
  const experiences = getLocalizedData(experiencesData, locale);
  const visible = experiences.slice(0, 3);

  return (
    <Room
      id="career"
      number="03"
      name={tSala('career')}
      title={t('title')}
      aside={
        experiences.length > 3 ? (
          <Button variant="ghost" href="/experience">
            {t('viewAll')}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      <div className="grid gap-10">
        {visible.map((exp) => (
          <ExperienceCard
            key={`${exp.company}-${exp.employmentDates}`}
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
        ))}
      </div>
    </Room>
  );
}
