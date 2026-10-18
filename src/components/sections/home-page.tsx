'use client';

import { useTranslations } from 'next-intl';
import { Header, Footer } from '@/components/layout';
import { SkipLink } from '@/components/ds';
import { useHashScroll } from '@/hooks/use-hash-scroll';
import { useLocale } from '@/context/locale-context';
import type { Locale } from '@/i18n/config';
import type { HomeLocaleData, SkillGroupSummary } from '@/types';
import { HeroSection } from './hero-section';
import { ProjectsSection } from './projects-section';
import { BlogPreviewSection } from './blog-preview-section';
import { ExperienceSection } from './experience-section';
import { SkillsSection } from './skills-section';
import { ContactSection } from './contact-section';

interface HomePageProps {
  byLocale: Record<Locale, HomeLocaleData>;
  skills: SkillGroupSummary[];
}

/** Home: hero, experience, skills, projects, blog, contact. Data arrives per language from the server. */
export function HomePage({ byLocale, skills }: HomePageProps) {
  const t = useTranslations('common');
  const { locale } = useLocale();
  const data = byLocale[locale as Locale] ?? byLocale.en;

  useHashScroll();

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink>{t('skipToContent')}</SkipLink>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        <HeroSection />
        <ExperienceSection experiences={data.experiences} />
        <SkillsSection groups={skills} />
        <ProjectsSection projects={data.projects} />
        <BlogPreviewSection posts={data.posts} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
