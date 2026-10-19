import type { HomeLocaleData, ProjectSummary, SkillIconSummary } from '@/types';
import { locales, type Locale } from '@/i18n/config';
import { getProjects } from './projects';
import { getBlogPosts } from './blog';
import { getExperiences } from './experiences';
import { skills as allSkills } from './skills';
import { toBlogSummary } from './blog/summaries';

/** Builds the home page's data for every language on the server, keeping only what the page renders. */
export function getHomeData(): { byLocale: Record<Locale, HomeLocaleData>; skills: SkillIconSummary[] } {
  const byLocale = {} as Record<Locale, HomeLocaleData>;
  for (const locale of locales) {
    byLocale[locale] = {
      projects: getProjects(locale)
        .slice(0, 6)
        .map(({ longDescription: _long, relevance: _relevance, ...project }): ProjectSummary => project),
      posts: getBlogPosts(locale).slice(0, 4).map(toBlogSummary),
      experiences: getExperiences(locale), // every role: the home page is the only place they live
    };
  }
  // One tile per icon: aliases that share an icon (Tailwind / Tailwind CSS) collapse into the first name.
  const seen = new Set<string>();
  const skills: SkillIconSummary[] = [];
  for (const skill of allSkills) {
    if (!skill.iconUrl || seen.has(skill.iconUrl)) continue;
    seen.add(skill.iconUrl);
    skills.push({ name: skill.name, iconUrl: skill.iconUrl, categories: skill.category });
  }
  return { byLocale, skills };
}
