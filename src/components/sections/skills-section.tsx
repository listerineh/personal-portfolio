'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/lib/data';
import type { Skill } from '@/types';
import { shuffleArray } from '@/lib/utils';
import { useGSAP } from '@/hooks/use-gsap';
import { Title, Button } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div
      className="skill-card flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-[colors,transform,border-color] duration-200 min-w-[80px] sm:min-w-[96px] md:min-w-[112px] mx-2 sm:mx-3 border border-foreground/[0.08] bg-foreground/[0.02] hover:border-primary/40 hover:bg-foreground/[0.04]"
      style={{ transformStyle: 'preserve-3d' }}
      title={skill.name}
    >
      {skill.iconUrl && (
        <img
          className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mb-1.5 aspect-square object-contain"
          src={skill.iconUrl}
          alt={skill.name}
        />
      )}
      <p className="text-[10px] sm:text-xs font-medium text-center text-foreground/60 truncate max-w-full leading-tight">
        {skill.name}
      </p>
    </div>
  );
}

export function SkillsSection() {
  const t = useTranslations('skills');
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Shuffle only once on mount - no need to recalculate
  const [shuffledArrays] = useState(() => {
    const shuffledSkills = shuffleArray([...skills]);
    const midpoint = Math.ceil(shuffledSkills.length / 2);
    return {
      shuffledArrayLtR: shuffledSkills.slice(0, midpoint),
      shuffledArrayRtL: shuffledSkills.slice(midpoint),
    };
  });

  const { shuffledArrayLtR, shuffledArrayRtL } = shuffledArrays;

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || !containerRef.current) return;

    if (row1Ref.current) {
      const row1 = row1Ref.current;
      const row1Width = row1.scrollWidth / 2;

      gsap.to(row1, {
        x: -row1Width,
        duration: 60,
        ease: 'none',
        repeat: -1,
      });
    }

    if (row2Ref.current) {
      const row2 = row2Ref.current;
      const row2Width = row2.scrollWidth / 2;

      gsap.fromTo(row2,
        { x: -row2Width },
        {
          x: 0,
          duration: 60,
          ease: 'none',
          repeat: -1,
        }
      );
    }

    if (descriptionRef.current) {
      gsap.from(descriptionRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, [mounted], { skipPerformanceCheck: true });

  useEffect(() => {
    const handlers = new Map<Element, { enter: () => void; leave: () => void }>();

    const cleanup = () => {
      handlers.forEach((handler, item) => {
        item.removeEventListener('mouseenter', handler.enter);
        item.removeEventListener('mouseleave', handler.leave);
      });
      handlers.clear();
    };

    if (!mounted) return cleanup;

    const skillElements = document.querySelectorAll('.skill-card');
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return cleanup;
    // Cache parent row references to avoid repeated querySelector
    const rowCache = new WeakMap<Element, Element | null>();

    skillElements.forEach((item) => {
      // Cache the parent row
      const parentRow = item.closest('.marquee-row');
      rowCache.set(item, parentRow);
      const img = item.querySelector('img');

      const handleMouseEnter = () => {
        const cachedRow = rowCache.get(item);
        if (cachedRow) {
          gsap.to(cachedRow, { timeScale: 0.3, duration: 0.3 });
        }

        if (img) {
          gsap.to(img, {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };

      const handleMouseLeave = () => {
        const cachedRow = rowCache.get(item);
        if (cachedRow) {
          gsap.to(cachedRow, { timeScale: 1, duration: 0.3 });
        }

        if (img) {
          gsap.killTweensOf(img);
          gsap.to(img, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };

      handlers.set(item, { enter: handleMouseEnter, leave: handleMouseLeave });
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    return cleanup;
  }, [mounted]);

  if (!mounted) {
    return (
      <section id="skills" className="relative py-28 md:py-44 overflow-hidden">
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <Title as="h2" animate className="text-display-sm">{t('title')}</Title>
        </div>
        <div className="min-h-[200px]" />
      </section>
    );
  }

  return (
    <section id="skills" className="relative py-28 md:py-44 overflow-hidden">
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto mb-14">
        <Title as="h2" animate className="text-display-sm">{t('title')}</Title>
      </div>
      <div ref={containerRef} className="relative py-4 overflow-hidden" style={{ perspective: '1500px' }}>
        <div className="overflow-hidden mb-3 md:mb-4 w-full">
          <div ref={row1Ref} className="marquee-row flex will-change-transform">
            {[...shuffledArrayLtR, ...shuffledArrayLtR].map((skill, index) => (
              <SkillCard key={`row1-${skill.name}-${index}`} skill={skill} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full">
          <div ref={row2Ref} className="marquee-row flex will-change-transform">
            {[...shuffledArrayRtL, ...shuffledArrayRtL].map((skill, index) => (
              <SkillCard key={`row2-${skill.name}-${index}`} skill={skill} />
            ))}
          </div>
        </div>
        
        <p
          ref={descriptionRef}
          className="text-center text-foreground/40 mt-10 md:mt-14 px-6 sm:px-10 max-w-3xl mx-auto text-caption"
        >
          {t('description')}
        </p>

        <div className="flex justify-center mt-8 px-6 sm:px-10 md:px-16 lg:px-24 reveal-up">
          <Button
            href="/skills"
            variant="ghost"
            accent="neutral"
            size="md"
            className="w-full sm:w-auto rounded-2xl sm:rounded-full justify-center border border-foreground/15 hover:border-foreground/30"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>


    </section>
  );
}

