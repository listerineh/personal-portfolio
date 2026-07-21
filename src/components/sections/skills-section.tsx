'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/lib/data';
import { shuffleArray } from '@/lib/utils';
import { useGSAP } from '@/hooks/use-gsap';
import { SectionLabel, Title } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
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
    if (!mounted) return;

    const skillElements = document.querySelectorAll('.skill-card');
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handlers = new Map();
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

    return () => {
      skillElements.forEach((item) => {
        const handler = handlers.get(item);
        if (handler) {
          item.removeEventListener('mouseenter', handler.enter);
          item.removeEventListener('mouseleave', handler.leave);
        }
      });
      handlers.clear();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <section id="skills" className="relative py-28 md:py-44 overflow-hidden">
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 max-w-6xl mx-auto">
          <SectionLabel accent="green" className="mb-8">{t('badge')}</SectionLabel>
          <Title as="h2" animate style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>{t('title')}</Title>
        </div>
        <div className="min-h-[200px]" />
      </section>
    );
  }

  const SkillCard = ({ skill }: { skill: typeof skills[0] }) => (
    <div
      className="skill-card flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 min-w-[80px] sm:min-w-[96px] md:min-w-[112px] mx-2 sm:mx-3"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        transformStyle: 'preserve-3d',
      }}
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

  return (
    <section id="skills" className="relative py-28 md:py-44 overflow-hidden">
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 max-w-6xl mx-auto mb-14">
        <SectionLabel accent="green" className="mb-8 reveal-up">{t('badge')}</SectionLabel>
        <Title as="h2" animate style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>{t('title')}</Title>
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
          className="text-center text-foreground/40 mt-10 md:mt-14 px-6 sm:px-10 max-w-3xl mx-auto"
          style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
        >
          {t('description')}
        </p>
      </div>

      {/* Watermark */}
      <div
        className="absolute right-[-2vw] font-headline font-black pointer-events-none select-none leading-none whitespace-nowrap"
        style={{
          top: '14%',
          fontSize: 'clamp(5rem, 11vw, 10rem)',
          color: 'var(--wm-green)',
        }}
      >
        STACK
      </div>
    </section>
  );
}

