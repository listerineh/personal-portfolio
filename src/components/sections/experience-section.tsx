'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiencesData } from '@/lib/data';
import { getLocalizedData } from '@/lib/i18n-data';
import { useLocale } from '@/context/locale-context';
import { useGSAP } from '@/hooks/use-gsap';
import { Title, ExperienceCard, Button } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceSection() {
  const t = useTranslations('experience');
  const tCommon = useTranslations('common');
  const { locale } = useLocale();
  const experiences = getLocalizedData(experiencesData, locale);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    itemsRef.current.forEach((item, index) => {
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

  const visible = experiences.slice(0, 3);

  return (
    <section id="experience" className="relative py-28 md:py-44 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        <div className="mb-16">
          <Title as="h2" animate className="text-display-sm">
            {t('title')}
          </Title>
        </div>

        {/* Timeline list */}
        <div className="relative">
          <div className="absolute left-[5px] top-3 bottom-3 w-px bg-foreground/10" />
          <div className="space-y-0 divide-y divide-foreground/[0.08]">
            {visible.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 md:pl-12 py-10"
                ref={(el) => { itemsRef.current[index] = el; }}
              >
                <div className="absolute left-[5px] top-14 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary" />
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
        </div>

        {experiences.length > 3 && (
          <div className="flex justify-center mt-10">
            <Button
              href="/experience"
              variant="ghost"
              accent="neutral"
              size="md"
              className="w-full sm:w-auto rounded-2xl sm:rounded-full justify-center border border-foreground/15 hover:border-foreground/30"
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
