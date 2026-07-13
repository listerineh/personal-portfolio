'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  Wrench, GraduationCap, Briefcase,
  Server, Monitor, Cloud, Sparkles,
  Music, Mail, ExternalLink,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { useGSAP } from '@/hooks/use-gsap';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
      {children}
    </span>
  );
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

  const phases = [
    {
      Icon: Wrench,
      label: t('phase1Label'),
      title: t('phase1Title'),
      body: t('phase1Body'),
      iconClass: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
      badgeClass: 'text-orange-400 bg-orange-500/10 border border-orange-500/25',
    },
    {
      Icon: GraduationCap,
      label: t('phase2Label'),
      title: t('phase2Title'),
      body: t('phase2Body'),
      iconClass: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      badgeClass: 'text-sky-400 bg-sky-500/10 border border-sky-500/25',
    },
    {
      Icon: Briefcase,
      label: t('phase3Label'),
      title: t('phase3Title'),
      body: t('phase3Body'),
      iconClass: 'text-primary bg-primary/10 border-primary/20',
      badgeClass: 'text-primary bg-primary/10 border border-primary/20',
    },
  ];

  const expertise = [
    { Icon: Server,   title: t('expertise1Title'), body: t('expertise1Body') },
    { Icon: Monitor,  title: t('expertise2Title'), body: t('expertise2Body') },
    { Icon: Cloud,    title: t('expertise3Title'), body: t('expertise3Body') },
    { Icon: Sparkles, title: t('expertise4Title'), body: t('expertise4Body') },
  ];

  return (
    <div>

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="hero-item">
            <SectionBadge>{t('heroBadge')}</SectionBadge>
          </div>

          <h1 className="hero-item text-4xl sm:text-5xl md:text-6xl font-headline font-bold leading-tight mb-6">
            {t('heroTitle')}
          </h1>

          <p className="hero-item text-lg md:text-xl text-primary font-semibold mb-8">
            {t('heroRole')}
          </p>

          <p className="hero-item text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
            {t('heroDescription')}
          </p>

          <div className="hero-item flex flex-wrap gap-3">
            <Link href="/#contact">
              <Button size="lg" className="gap-2">
                <Mail className="w-4 h-4" />
                {t('heroCTA')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Journey ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="scroll-reveal mb-12 md:mb-16">
            <SectionBadge>{t('journeyBadge')}</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold">{t('journeyTitle')}</h2>
          </div>

          <div>
            {phases.map(({ Icon, label, title, body, iconClass, badgeClass }, i) => (
              <div key={i} className="scroll-reveal">

                {/* Card */}
                <div className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center border-2 flex-shrink-0', iconClass)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wider uppercase', badgeClass)}>
                      {label}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-headline font-bold mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{body}</p>
                </div>

                {/* Connector — aligns with icon center (p-6=24px + w-11/2=22px = 46px) */}
                {i < phases.length - 1 && (
                  <div className="pl-[46px] py-1">
                    <div className="w-px h-8 bg-border/70" />
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Expertise ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="scroll-reveal mb-12 md:mb-16">
            <SectionBadge>{t('expertiseBadge')}</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold">{t('expertiseTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expertise.map(({ Icon, title, body }, i) => (
              <div
                key={i}
                className="scroll-reveal p-5 sm:p-6 rounded-xl bg-card border border-border/50 hover:border-primary/40 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-headline font-bold text-base md:text-lg leading-tight">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Community ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="scroll-reveal mb-12 md:mb-16">
            <SectionBadge>{t('communityBadge')}</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold">{t('communityTitle')}</h2>
          </div>

          <div className="scroll-reveal space-y-8">

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {t('communityBody')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { stat: t('communityStat1'), label: t('communityStat1Label') },
                { stat: t('communityStat2'), label: t('communityStat2Label') },
                { stat: t('communityStat3'), label: t('communityStat3Label') },
              ].map(({ stat, label }, i) => (
                <div key={i} className="p-3 sm:p-5 rounded-xl bg-card border border-border/50 text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-primary mb-1">{stat}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{label}</div>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://gdg.community.dev/gdg-quito/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                {t('communityJoin')}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Beyond Code ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="scroll-reveal mb-12 md:mb-16">
            <SectionBadge>{t('musicBadge')}</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold">{t('musicTitle')}</h2>
          </div>

          <div className="scroll-reveal flex flex-row gap-6 p-6 sm:p-8 rounded-xl bg-card border border-border/50">
            <div className="w-14 h-14 p-4 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/30 flex items-center justify-center flex-shrink-0">
              <Music className="w-6 h-6 text-[#1DB954]" />
            </div>
            <div className="min-w-0">
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-5">
                {t('musicBody')}
              </p>
              <Link
                href="/why"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1DB954] hover:underline"
              >
                {t('musicLink')}
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="scroll-reveal text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-muted-foreground mb-8">{t('ctaBody')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/#contact">
                <Button size="lg" className="gap-2">
                  <Mail className="w-4 h-4" />
                  {t('ctaPrimary')}
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
