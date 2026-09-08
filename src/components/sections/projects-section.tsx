'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '@/lib/data';
import { getLocalizedData } from '@/lib/i18n-data';
import { useLocale } from '@/context/locale-context';
import { useGSAP } from '@/hooks/use-gsap';
import { Title, ProjectCard, Button } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsSection() {
  const t = useTranslations('projects');
  const tCommon = useTranslations('common');
  const { locale } = useLocale();
  const projects = getLocalizedData(projectsData, locale);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: (index % 3) * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    });
  }, [projects.length]);

  return (
    <section id="projects" className="relative py-28 md:py-44 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <Title as="h2" animate className="text-display-sm">
            {t('title')}
          </Title>
          {projects.length > 3 && (
            <Button
              href="/projects"
              variant="ghost"
              accent="neutral"
              size="md"
              className="shrink-0 rounded-full border border-foreground/15 hover:border-foreground/30 hidden md:inline-flex"
            >
              {t('viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
        {/* Balanced 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, index) => (
            <div
              key={project.id}
              className="h-full"
              ref={(el) => { cardsRef.current[index] = el; }}
            >
              <ProjectCard
                slug={project.slug}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                tags={[...project.tags]}
                viewMoreLabel={tCommon('viewProject')}
              />
            </div>
          ))}
        </div>
        {projects.length > 3 && (
          <div className="flex justify-start mt-10 md:hidden">
            <Button
              href="/projects"
              variant="ghost"
              accent="neutral"
              size="md"
              className="w-full rounded-2xl justify-center border border-foreground/15 hover:border-foreground/30"
            >
              {t('viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>


    </section>
  );
}
