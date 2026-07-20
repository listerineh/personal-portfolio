'use client';

import React, { useRef } from 'react';
import {
  Wrench, GraduationCap, Briefcase,
  Server, Monitor, Cloud, Sparkles,
  Music, Mail,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import { SectionHeader, SectionLabel, Button, AccentCard, BrandLink } from '@/components/ds';
import type { Accent } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutContent() {
  const t = useTranslations('about');
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero entrance — timeline with staggered items, matching homepage style
    if (heroRef.current) {
      gsap.timeline({ defaults: { ease: 'power2.out' } })
        .from(heroRef.current.querySelectorAll('.hero-item'), {
          y: 24,
          opacity: 0,
          stagger: 0.12,
          duration: 0.5,
          clearProps: 'opacity,transform',
        });
    }

    // Scroll-triggered section reveals
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      gsap.from(el, {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, [], { skipPerformanceCheck: true });

  const phases: { Icon: React.ElementType; label: string; title: string; body: string; accent: Accent }[] = [
    { Icon: Wrench,       label: t('phase1Label'), title: t('phase1Title'), body: t('phase1Body'), accent: 'amber'  },
    { Icon: GraduationCap,label: t('phase2Label'), title: t('phase2Title'), body: t('phase2Body'), accent: 'neutral'},
    { Icon: Briefcase,    label: t('phase3Label'), title: t('phase3Title'), body: t('phase3Body'), accent: 'indigo' },
  ];

  const expertise: { Icon: React.ElementType; title: string; body: string }[] = [
    { Icon: Server,   title: t('expertise1Title'), body: t('expertise1Body') },
    { Icon: Monitor,  title: t('expertise2Title'), body: t('expertise2Body') },
    { Icon: Cloud,    title: t('expertise3Title'), body: t('expertise3Body') },
    { Icon: Sparkles, title: t('expertise4Title'), body: t('expertise4Body') },
  ];

  return (
    <div>

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="hero-item mb-4">
            <SectionLabel accent="indigo">{t('heroBadge')}</SectionLabel>
          </div>
          <h1
            className="hero-item font-headline font-bold leading-[0.92] text-foreground mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            {t('heroTitle')}
          </h1>
          <p className="hero-item font-headline font-semibold text-foreground/50 mb-6" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
            {t('heroRole')}
          </p>
          <p className="hero-item text-foreground/50 leading-relaxed mb-10" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>
            {t('heroDescription')}
          </p>
          <div className="hero-item">
            <Button variant="primary" accent="indigo" size="md" href="/#contact">
              <Mail className="w-4 h-4" />
              {t('heroCTA')}
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Journey ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal mb-12 md:mb-16">
            <SectionHeader label={t('journeyBadge')} labelAccent="indigo" title={t('journeyTitle')} />
          </div>
          <div className="space-y-4">
            {phases.map(({ Icon, label, title, body, accent }, i) => (
              <div key={i} className="scroll-reveal">
                <AccentCard accent={accent}>
                  <div className="flex items-start gap-4 p-6">
                    <div className="shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-foreground/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <SectionLabel accent={accent}>{label}</SectionLabel>
                      </div>
                      <h3 className="font-headline font-bold text-foreground mb-2" style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)' }}>
                        {title}
                      </h3>
                      <p className="text-sm text-foreground/55 leading-relaxed">{body}</p>
                    </div>
                  </div>
                </AccentCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Expertise ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal mb-12 md:mb-16">
            <SectionHeader label={t('expertiseBadge')} labelAccent="indigo" title={t('expertiseTitle')} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expertise.map(({ Icon, title, body }, i) => (
              <div key={i} className="scroll-reveal">
                <AccentCard accent="indigo">
                  <div className="flex items-start gap-4 p-6">
                    <div className="shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-foreground/60" />
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-foreground mb-2">{title}</h3>
                      <p className="text-sm text-foreground/55 leading-relaxed">{body}</p>
                    </div>
                  </div>
                </AccentCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Community ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal mb-12 md:mb-16">
            <SectionHeader label={t('communityBadge')} labelAccent="amber" title={t('communityTitle')} />
          </div>
          <div className="scroll-reveal space-y-8">
            <p className="text-foreground/55 leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
              {t('communityBody')}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { stat: t('communityStat1'), label: t('communityStat1Label') },
                { stat: t('communityStat2'), label: t('communityStat2Label') },
                { stat: t('communityStat3'), label: t('communityStat3Label') },
              ].map(({ stat, label }, i) => (
                <AccentCard key={i} accent="amber">
                  <div className="p-4 text-center">
                    <div className="font-headline font-bold text-foreground mb-1" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{stat}</div>
                    <div className="text-xs text-foreground/45 leading-tight">{label}</div>
                  </div>
                </AccentCard>
              ))}
            </div>
            <div>
              <BrandLink href="https://gdg.community.dev/gdg-quito/" color="#4285F4" variant="outline">
                {t('communityJoin')} ↗
              </BrandLink>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Beyond Code ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal mb-12 md:mb-16">
            <SectionHeader label={t('musicBadge')} labelAccent="green" title={t('musicTitle')} />
          </div>
          <div className="scroll-reveal">
            <AccentCard accent="green">
              <div className="flex flex-row gap-6 p-6 sm:p-8">
                <div className="shrink-0 mt-1">
                  <Music className="w-6 h-6" style={{ color: '#1DB954' }} />
                </div>
                <div className="min-w-0">
                  <p className="text-foreground/55 leading-relaxed mb-5" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                    {t('musicBody')}
                  </p>
                  <BrandLink href="/why" color="#1DB954" variant="outline">
                    {t('musicLink')} ↗
                  </BrandLink>
                </div>
              </div>
            </AccentCard>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal text-center">
            <h2 className="font-headline font-bold text-foreground mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              {t('ctaTitle')}
            </h2>
            <p className="text-foreground/50 mb-10" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>
              {t('ctaBody')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" accent="indigo" size="md" href="/#contact">
                <Mail className="w-4 h-4" />
                {t('ctaPrimary')}
              </Button>
              <Button variant="secondary" accent="neutral" size="md" href="/">
                {t('ctaSecondary')}
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
