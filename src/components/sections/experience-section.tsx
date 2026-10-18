'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Button, Reveal, RoleExplorer, Section } from '@/components/ds';
import { isCurrentRole } from '@/lib/experience-utils';
import type { Experience } from '@/types';

/** Career: pick a role on the timeline, read it in full beside it. Current roles carry the live dot. */
export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const t = useTranslations('experience');
  const tSala = useTranslations('sala');
  const roles = experiences.slice(0, 4).map((exp) => ({
    company: exp.company,
    jobTitle: exp.jobTitle,
    employmentDates: exp.employmentDates,
    location: exp.location,
    logoUrl: exp.logoUrl,
    responsibilities: exp.responsibilities,
    current: isCurrentRole(exp.employmentDates),
  }));

  return (
    <Section
      ambient={{ intensity: 'soft', grid: false, spotlight: false }}
      id="career"
      tone="tint"
      title={t('title')}
      aside={
        experiences.length > 4 ? (
          <Button variant="ghost" accent="amber" href="/experience">
            {t('viewAll')}
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      <Reveal>
        <RoleExplorer roles={roles} label={t('rolesLabel')} currentLabel={tSala('now')} />
      </Reveal>
    </Section>
  );
}
