'use client';

import { useTranslations } from 'next-intl';
import { Reveal, RoleExplorer, Section } from '@/components/ds';
import { isCurrentRole } from '@/lib/experience-utils';
import type { Experience } from '@/types';

/** Career, complete: every role on the timeline, the chosen one in full beside it. Current roles carry the live dot. */
export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const t = useTranslations('experience');
  const tSala = useTranslations('sala');
  const roles = experiences.map((exp) => ({
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
    >
      <Reveal>
        <RoleExplorer roles={roles} label={t('rolesLabel')} currentLabel={tSala('now')} />
      </Reveal>
    </Section>
  );
}
