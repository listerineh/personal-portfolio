'use client';

import { useTranslations } from 'next-intl';
import type { Experience } from '@/types';
import { EndOfList, ExperienceCard, PageHeader } from '@/components/ds';
import { PageShell } from '@/components/layout';
import { isCurrentRole } from '@/lib/experience-utils';

interface ExperienceListingClientProps {
  experiences: Experience[];
}

export function ExperienceListingClient({ experiences }: ExperienceListingClientProps) {
  const t = useTranslations('experience');
  const tCommon = useTranslations('common');
  const tSala = useTranslations('sala');

  return (
    <PageShell>
      <PageHeader number="03" name={tSala('career')} title={t('pageTitle')} intro={t('pageDescription')} />
      <section className="px-gutter py-16 md:py-24">
        <div className="mx-auto max-w-[1296px]">
          {experiences.length > 0 ? (
            <>
              <ol className="grid gap-12 md:gap-16">
                {experiences.map((exp) => (
                  <li key={`${exp.company}-${exp.employmentDates}`}>
                    <ExperienceCard
                      headingLevel="h2"
                      jobTitle={exp.jobTitle}
                      company={exp.company}
                      employmentDates={exp.employmentDates}
                      location={exp.location}
                      logoUrl={exp.logoUrl}
                      responsibilities={exp.responsibilities}
                      initialVisible={exp.responsibilities.length}
                      currentLabel={isCurrentRole(exp.employmentDates) ? tSala('now') : undefined}
                    />
                  </li>
                ))}
              </ol>
              <EndOfList>{tCommon('endOfList')}</EndOfList>
            </>
          ) : (
            <div className="plaque max-w-xl p-6 md:p-8">
              <p className="text-headline">{t('noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
