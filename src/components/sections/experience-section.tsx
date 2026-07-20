'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiencesData } from '@/lib/data';
import { getLocalizedData } from '@/lib/i18n-data';
import { useLocale } from '@/context/locale-context';
import { useGSAP } from '@/hooks/use-gsap';
import { SectionLabel, Title, ExperienceCard, Button } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceSection() {
  const t = useTranslations('experience');
  const tCommon = useTranslations('common');
  const { locale } = useLocale();
  const experiences = getLocalizedData(experiencesData, locale);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleShowAll = () => {
    setShowAll(true);
    setTimeout(() => {
      itemsRef.current.slice(3).forEach((item) => {
        if (item) gsap.from(item, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' });
      });
      ScrollTrigger.refresh();
    }, 50);
  };

  useGSAP(() => {
    itemsRef.current.slice(0, 3).forEach((item, index) => {
      if (item) {
        gsap.from(item, {
          opacity: 0,
          y: 24,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    });
  }, []);

  const visible = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="relative py-28 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden">
      <div ref={sectionRef} className="max-w-5xl mx-auto relative z-10">
        <SectionLabel accent="indigo" className="mb-8 reveal-up">{t('badge')}</SectionLabel>
        <Title as="h2" animate className="mb-16" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
          {t('title')}
        </Title>

        <div className="space-y-6">
          {visible.map((exp, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
            >
              <ExperienceCard
                jobTitle={exp.jobTitle}
                company={exp.company}
                employmentDates={exp.employmentDates}
                location={exp.location}
                logoUrl={exp.logoUrl}
                responsibilities={exp.responsibilities}
                showMoreLabel={tCommon('seeMore')}
                showLessLabel={tCommon('showLess')}
              />
            </div>
          ))}
        </div>

        {experiences.length > 3 && !showAll && (
          <div className="flex justify-start mt-10 reveal-up">
            <Button variant="ghost" accent="neutral" size="md" onClick={handleShowAll}>
              {t('showAll')}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Watermark */}
      <div
        className="absolute right-[-2vw] top-1/3 font-headline font-black pointer-events-none select-none leading-none"
        style={{
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          color: 'rgba(129,140,248,0.04)',
        }}
      >
        XP
      </div>
    </section>
  );
}
