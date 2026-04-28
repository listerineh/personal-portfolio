import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';
import { firebaseVsSupabase } from './firebase-vs-supabase';
import { pythonRenaissanceAiEra } from './python-renaissance-ai-era';
import { adaptingToNewJobs } from './adapting-to-new-jobs';
import { terraformScalingInfrastructure } from './terraform-scaling-infrastructure';
import { fromJuniorToSenior } from './from-junior-to-senior-engineer';
import { letsTalkMicroservices } from './lets-talk-microservices';
import { codingThroughBurnout } from './coding-through-burnout';
import { fromChaosToClarity } from './from-chaos-to-clarity-kanban';
import { whyMarkdownForBlogs } from './why-markdown-for-blogs';
import { theFirstDigitalDeath } from './the-first-digital-death';
import { vibeCodingCursorWorkshop } from './vibe-coding-cursor-workshop';
import { controlledObservabilityModernDevelopment } from './controlled-observability-modern-development';

const allBlogPosts = {
  en: [
    controlledObservabilityModernDevelopment.en,
    vibeCodingCursorWorkshop.en,
    firebaseVsSupabase.en,
    theFirstDigitalDeath.en,
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
    controlledObservabilityModernDevelopment.es,
    vibeCodingCursorWorkshop.es,
    firebaseVsSupabase.es,
    theFirstDigitalDeath.es,
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
