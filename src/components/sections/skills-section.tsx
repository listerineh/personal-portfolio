'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/lib/data';
import { shuffleArray } from '@/lib/utils';
import { SectionWrapper } from '@/components/common/section-wrapper';
import { useGSAP } from '@/hooks/use-gsap';

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

  const { shuffledArrayLtR, shuffledArrayRtL } = useMemo(() => {
    if (!mounted) {
      const midpoint = Math.ceil(skills.length / 2);
      return {
        shuffledArrayLtR: skills.slice(0, midpoint),
        shuffledArrayRtL: skills.slice(midpoint),
      };
    }
    const shuffledSkills = shuffleArray([...skills]);
    const midpoint = Math.ceil(shuffledSkills.length / 2);
    return {
      shuffledArrayLtR: shuffledSkills.slice(0, midpoint),
      shuffledArrayRtL: shuffledSkills.slice(midpoint),
    };
  }, [mounted]);

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
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const skillElements = document.querySelectorAll('.skill-card');
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handlers = new Map();

    skillElements.forEach((item) => {
      const handleMouseEnter = () => {
        const parentRow = item.closest('.marquee-row');
        if (parentRow) {
          gsap.to(parentRow, { timeScale: 0.3, duration: 0.3 });
        }

        const img = item.querySelector('img');
        gsap.to(img, {
          scale: 1.1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        const parentRow = item.closest('.marquee-row');
        if (parentRow) {
          gsap.to(parentRow, { timeScale: 1, duration: 0.3 });
        }

        const img = item.querySelector('img');
        gsap.killTweensOf(img);
        gsap.to(img, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
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
      <SectionWrapper title={t('title')} id='skills' className="bg-secondary/85" isInfinite>
        <div className="min-h-[200px]" />
      </SectionWrapper>
    );
  }

  const SkillCard = ({ skill }: { skill: typeof skills[0] }) => (
    <div
      className="skill-card flex flex-col items-center justify-center p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 cursor-pointer transition-colors min-w-[80px] sm:min-w-[96px] md:min-w-[112px] mx-2 sm:mx-3"
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
      <p className="text-[10px] sm:text-xs font-medium text-center text-foreground/80 truncate max-w-full leading-tight">
        {skill.name}
      </p>
    </div>
  );

  return (
    <SectionWrapper title={t('title')} id='skills' className="bg-secondary/85" isInfinite badge={t('badge')}>   
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
          className="text-center text-muted-foreground mt-8 md:mt-10 text-sm md:text-base px-4 max-w-3xl mx-auto"
        >
          {t('description')}
        </p>
      </div>
    </SectionWrapper>
  );
}

