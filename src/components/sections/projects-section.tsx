'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '@/lib/data';
import { getLocalizedData } from '@/lib/i18n-data';
import { useLocale } from '@/context/locale-context';
import { useGSAP } from '@/hooks/use-gsap';
import { SectionLabel, Title, ProjectCard, Button } from '@/components/ds';

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
        <SectionLabel accent="amber" className="mb-8 reveal-up">{t('badge')}</SectionLabel>
        <Title as="h2" animate className="mb-16" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
          {t('title')}
        </Title>
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

        {/* View All Button */}
        {projects.length > 3 && (
          <div className="flex justify-start mt-12 reveal-up">
            <Button
              href="/projects"
              variant="ghost"
              accent="neutral"
              size="md"
              className="w-full md:w-auto rounded-2xl md:rounded-full justify-center border border-foreground/15 hover:border-foreground/30"
            >
              {t('viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Watermark */}
      <div
        className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black pointer-events-none select-none leading-none"
        style={{ top: '8%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-amber)' }}
      >
        {Array.from({ length: 10 }, (_, i) => <span key={i}>{t('watermark')}&nbsp;&nbsp;</span>)}
      </div>
    </section>
  );
}
