import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';
import { pythonRenaissanceAiEra } from './python-renaissance-ai-era';
import { adaptingToNewJobs } from './adapting-to-new-jobs';
import { terraformScalingInfrastructure } from './terraform-scaling-infrastructure';
import { fromJuniorToSenior } from './from-junior-to-senior-engineer';
import { letsTalkMicroservices } from './lets-talk-microservices';
import { codingThroughBurnout } from './coding-through-burnout';
import { fromChaosToClarity } from './from-chaos-to-clarity-kanban';
import { whyMarkdownForBlogs } from './why-markdown-for-blogs';

const allBlogPosts = {
  en: [
    pythonRenaissanceAiEra.en,
    adaptingToNewJobs.en,
    terraformScalingInfrastructure.en,
    fromJuniorToSenior.en,
    letsTalkMicroservices.en,
    codingThroughBurnout.en,
    fromChaosToClarity.en,
    whyMarkdownForBlogs.en,
  ],
  es: [
    pythonRenaissanceAiEra.es,
    adaptingToNewJobs.es,
    terraformScalingInfrastructure.es,
    fromJuniorToSenior.es,
    letsTalkMicroservices.es,
    codingThroughBurnout.es,
    fromChaosToClarity.es,
    whyMarkdownForBlogs.es,
  ],
};

export function getBlogPosts(locale: Locale): BlogPost[] {
  return allBlogPosts[locale] || allBlogPosts.en;
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
  const posts = getBlogPosts(locale);
  return posts.find(post => post.slug === slug);
}
