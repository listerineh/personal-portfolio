'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Mail, MapPin, Server, Monitor, Cloud, Sparkles, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { useGSAP } from '@/hooks/use-gsap';
import { Title, Text, Button } from '@/components/ds';
import { communityLinks } from '@/lib/data';
import Link from 'next/link';

export function AboutContent() {
  const t = useTranslations('about');
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && heroRef.current) {
      gsap.from(heroRef.current.querySelectorAll('.hero-item'), {
        opacity: 0, y: 28, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.15,
      });
    }
  }, []);

  const phases = [
    { id: 'phase1', label: t('phase1Label'), title: t('phase1Title'), body: t('phase1Body') },
    { id: 'phase2', label: t('phase2Label'), title: t('phase2Title'), body: t('phase2Body') },
    { id: 'phase3', label: t('phase3Label'), title: t('phase3Title'), body: t('phase3Body') },
  ];

  const expertise = [
    { id: 'backend',   Icon: Server,   title: t('expertise1Title'), body: t('expertise1Body') },
    { id: 'frontend',  Icon: Monitor,  title: t('expertise2Title'), body: t('expertise2Body') },
    { id: 'cloud',     Icon: Cloud,    title: t('expertise3Title'), body: t('expertise3Body') },
    { id: 'ai',        Icon: Sparkles, title: t('expertise4Title'), body: t('expertise4Body') },
  ];

  const stats = [
    { stat: t('communityStat1'), label: t('communityStat1Label') },
    { stat: t('communityStat2'), label: t('communityStat2Label') },
    { stat: t('communityStat3'), label: t('communityStat3Label') },
  ];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 sm:px-10 md:px-16 lg:px-24">
        <div ref={heroRef} className="max-w-5xl mx-auto">
          <h1
            className="hero-item font-headline font-black leading-[0.88] mb-6"
          >
            <span className="block text-foreground text-display">
              {t('heroGreeting')}
            </span>
            <span className="block text-primary text-display">
              Sebastian.
            </span>
          </h1>
          <p className="hero-item text-foreground/50 text-base md:text-lg leading-relaxed mb-4 max-w-xl">
            {t('heroRole')}
          </p>
          <div className="hero-item flex items-center gap-1.5 text-foreground/30 text-xs font-headline tracking-[0.2em] uppercase">
            <MapPin className="w-3 h-3" />
            Quito, Ecuador
          </div>
        </div>
      </section>

      {/* ── INTRO PULL QUOTE ─────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 overflow-hidden">

        <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
          <div className="relative pl-10 md:pl-14">
            <Quote
              className="absolute top-0 left-0 w-8 h-8 md:w-10 md:h-10 text-foreground/10"
              aria-hidden="true"
            />
            <Title
              as="h2"
              animate
              className="leading-[1.15] text-subhead"
              style={{ maxWidth: '44rem' }}
            >
              {t('heroDescription')}
            </Title>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ──────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <Title as="h2" animate className="mb-20 text-display-sm text-primary">
            {t('journeyTitle')}
          </Title>

          <div className="reveal-stagger">
            {phases.map(({ id, label, title, body }) => (
              <div key={id} className="relative border-t border-foreground/[0.08] py-14 md:py-20 grid md:grid-cols-[12rem_1fr] gap-6 md:gap-16">
                <div className="shrink-0 pt-1">
                  <span className="font-headline text-[11px] tracking-[0.3em] uppercase text-foreground/30">
                    {label}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-headline font-black text-foreground mb-6 text-headline"
                  >
                    {title}
                  </h3>
                  <p className="text-foreground/50 leading-relaxed max-w-2xl text-lead">
                    {body}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-foreground/[0.08]" />
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/[0.06] to-primary/0 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
          <div className="mb-16">
            <span className="block font-headline text-[11px] tracking-[0.2em] uppercase text-foreground/30 mb-4">
              {t('expertiseBadge')}
            </span>
            <Title as="h2" animate className="text-display-sm">
              {t('expertiseTitle')}
            </Title>
          </div>

          <div className="reveal-stagger divide-y divide-foreground/[0.08]">
              {expertise.map(({ id, Icon, title, body }, i) => (
                <div
                  key={id}
                  className="py-10 md:py-12 grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start group"
                >
                  <span className="font-headline text-[11px] tracking-[0.15em] uppercase text-foreground/25 pt-1.5 group-hover:text-primary transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
                      <h3 className="font-headline font-bold text-foreground text-headline">
                        {title}
                      </h3>
                    </div>
                    <p className="text-foreground/50 leading-relaxed text-base max-w-2xl">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* ── COMMUNITY ────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/[0.06] to-primary/0 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24 items-start">
            <div>
              <Title as="h2" animate className="text-display-sm text-primary mb-8">
                {t('communityTitle')}
              </Title>

              <Text size="lg" strength="secondary" accent="amber" animate className="max-w-2xl mb-12">
                {t('communityBody')}
              </Text>

              <div className="reveal-up flex flex-wrap gap-x-12 gap-y-8">
                {stats.map(({ stat, label }) => (
                  <div key={`${stat}-${label}`} className="min-w-[8rem]">
                    <div className="font-headline text-4xl md:text-5xl font-black text-primary leading-none">
                      {stat}
                    </div>
                    <div className="text-[10px] font-headline tracking-[0.15em] uppercase text-foreground/35 leading-tight mt-2">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-up border-t lg:border-t-0 lg:border-l border-foreground/[0.08] pt-10 lg:pt-0 lg:pl-12">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/images/gdg_quito_logo.webp"
                  alt="GDG Quito"
                  width={48}
                  height={48}
                  className="rounded-full shrink-0"
                />
                <h3 className="font-headline font-bold text-foreground text-headline">
                  Google Developer Groups — Quito
                </h3>
              </div>
              <p className="text-sm text-foreground/45 leading-relaxed mb-6">
                {t('communityCardBody')}
              </p>
              <a
                href={communityLinks.gdgQuito}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-headline font-semibold text-xs uppercase tracking-wide text-foreground/50 hover:text-primary transition-colors"
              >
                {t('communityJoin')}
                <span aria-hidden="true" className="text-base leading-none">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEYOND CODE ──────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/0 via-green-950/[0.07] to-green-950/0 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10 text-center">
          <Title
            as="h2"
            animate
            className="mb-10 text-green-500 text-display-sm text-center"
          >
            {t('musicTitle')}
          </Title>

          <div className="flex flex-col items-center gap-10">
            <Text size="lg" strength="secondary" animate className="max-w-2xl text-center">
              {t('musicBody')}
            </Text>
            <div className="reveal-up">
              <Link
                href="/why"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-full text-sm transition-[colors,transform] duration-300 text-black hover:brightness-110 bg-green-500 active:scale-[0.97]"
              >
                {t('musicLink')} ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto reveal-up text-center flex flex-col items-center">
          <Title as="h2" animate className="mb-6 text-display-sm">
            {t('ctaTitle')}
          </Title>
          <p
            className="text-foreground/45 leading-relaxed mb-10 max-w-xl text-lead"
          >
            {t('ctaBody')}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button variant="primary" accent="amber" size="lg" href="/contact" className="w-full sm:w-auto justify-center rounded-2xl sm:rounded-full">
              <Mail className="w-4 h-4" />
              {t('ctaPrimary')}
            </Button>
            <Button variant="secondary" accent="neutral" size="lg" href="/" className="w-full sm:w-auto justify-center rounded-2xl sm:rounded-full">
              {t('ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
