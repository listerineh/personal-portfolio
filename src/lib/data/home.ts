import type { HomeLocaleData, ProjectSummary, SkillGroupSummary } from '@/types';
import { locales, type Locale } from '@/i18n/config';
import { getProjects } from './projects';
import { getBlogPosts } from './blog';
import { getExperiences } from './experiences';
import { getSkillsByCategory } from './skills';
import { toBlogSummary } from './blog/summaries';

/** Builds the home page's data for every language on the server, keeping only what the page renders. */
export function getHomeData(): { byLocale: Record<Locale, HomeLocaleData>; skills: SkillGroupSummary[] } {
  const byLocale = {} as Record<Locale, HomeLocaleData>;
  for (const locale of locales) {
    byLocale[locale] = {
      projects: getProjects(locale)
        .slice(0, 6)
        .map(({ longDescription: _long, relevance: _relevance, ...project }): ProjectSummary => project),
      posts: getBlogPosts(locale).slice(0, 3).map(toBlogSummary),
      experiences: getExperiences(locale).slice(0, 4), // 3 shown + 1 tells the room there is more
    };
  }
  const skills = getSkillsByCategory()
    .slice(0, 6)
    .map(({ category, skills: list }) => ({ category, names: list.slice(0, 10).map((skill) => skill.name) }));
  return { byLocale, skills };
}
