import type { Project } from '@/types';

/**
 * Amber means "live now", so only one work wears it: the most recently started one still in progress.
 * Other in-progress works keep a neutral status tag.
 */
export function liveProjectSlug(projects: Pick<Project, 'slug' | 'status' | 'startDate'>[]): string | undefined {
  return projects
    .filter((project) => project.status === 'in-progress')
    .sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? ''))[0]?.slug;
}
