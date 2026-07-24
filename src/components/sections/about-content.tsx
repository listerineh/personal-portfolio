'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Mail, MapPin, Server, Monitor, Cloud, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import { SectionLabel, Title, Text, Button, BrandLink, AccentCard } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

    if (!prefersReducedMotion) {
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 50, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });

      gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((container) => {
        gsap.from(Array.from(container.children), {
          opacity: 0, y: 36, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
    }
  }, []);

  const phases = [
    { label: t('phase1Label'), title: t('phase1Title'), body: t('phase1Body') },
    { label: t('phase2Label'), title: t('phase2Title'), body: t('phase2Body') },
    { label: t('phase3Label'), title: t('phase3Title'), body: t('phase3Body') },
  ];

  const expertise = [
    { Icon: Server,   title: t('expertise1Title'), body: t('expertise1Body') },
    { Icon: Monitor,  title: t('expertise2Title'), body: t('expertise2Body') },
    { Icon: Cloud,    title: t('expertise3Title'), body: t('expertise3Body') },
    { Icon: Sparkles, title: t('expertise4Title'), body: t('expertise4Body') },
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
          <div className="hero-item mb-5">
            <SectionLabel accent="indigo">{t('heroBadge')}</SectionLabel>
          </div>
          <h1
            className="hero-item font-headline font-black leading-[0.88] mb-6"
          >
            <span className="block text-foreground" style={{ fontSize: 'clamp(3.2rem, 10vw, 9rem)' }}>
              {t('heroGreeting')}
            </span>
            <span
              className="block text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(3rem, 9.5vw, 8.5rem)',
                backgroundImage: 'linear-gradient(90deg, #818cf8, #c7d2fe, #818cf8)',
              }}
            >
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
        <div
          className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black select-none pointer-events-none leading-none"
          style={{ top: '8%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-indigo)' }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i}>{t('wmStory')}&nbsp;&nbsp;</span>
          ))}
        </div>
        <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
          <SectionLabel animate accent="indigo" className="mb-8">
            {t('journeyBadge')}
          </SectionLabel>
          <Title
            as="h2"
            animate
            className="leading-[1.15]"
            style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.3rem)', maxWidth: '44rem' }}
          >
            {t('heroDescription')}
          </Title>
        </div>
      </section>

      {/* ── JOURNEY ──────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionLabel animate accent="indigo" className="mb-6">
            {t('journeyBadge')}
          </SectionLabel>
          <Title as="h2" gradient="indigo" animate className="mb-20" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
            {t('journeyTitle')}
          </Title>

          <div className="reveal-stagger">
            {phases.map(({ label, title, body }, i) => (
              <div key={i} className="relative border-t border-foreground/[0.08] py-14 md:py-20 grid md:grid-cols-[12rem_1fr] gap-6 md:gap-16">
                <div className="shrink-0 pt-1">
                  <span className="font-headline text-[11px] tracking-[0.3em] uppercase text-foreground/30">
                    {label}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-headline font-black text-foreground mb-6"
                    style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-foreground/50 leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>
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
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/0 via-indigo-950/[0.06] to-indigo-950/0 pointer-events-none" />
        <div
          className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black select-none pointer-events-none leading-none"
          style={{ top: '14%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-indigo)' }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i}>{t('wmCode')}&nbsp;&nbsp;</span>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
          <SectionLabel animate accent="indigo" className="mb-6">
            {t('expertiseBadge')}
          </SectionLabel>
          <Title as="h2" animate className="mb-16" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
            {t('expertiseTitle')}
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-stagger">
            {expertise.map(({ Icon, title, body }, i) => (
              <AccentCard key={i} accent="indigo" className="p-8">
                <div className="flex flex-col gap-5">
                  <Icon className="w-6 h-6 shrink-0" style={{ color: '#818cf8' }} />
                  <h3
                    className="font-headline font-black text-foreground"
                    style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-foreground/45 leading-relaxed">{body}</p>
                </div>
              </AccentCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/[0.06] to-primary/0 pointer-events-none" />
        <div
          className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black select-none pointer-events-none leading-none"
          style={{ top: '8%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-amber)' }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i}>{t('wmGdg')}&nbsp;&nbsp;</span>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
          <SectionLabel animate accent="amber" className="mb-6">
            {t('communityBadge')}
          </SectionLabel>
          <Title as="h2" gradient="amber" animate className="mb-16" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
            {t('communityTitle')}
          </Title>

          <Text size="lg" strength="secondary" animate className="mb-10">
            {t('communityBody')}
          </Text>

          <div className="reveal-stagger grid grid-cols-3 gap-6 md:gap-10 mb-16">
            {stats.map(({ stat, label }, i) => (
              <div key={i} className="border-t border-primary/20 pt-5">
                <div className="font-headline font-black text-primary mb-1" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                  {stat}
                </div>
                <div className="text-[10px] font-headline tracking-[0.15em] uppercase text-foreground/35 leading-tight">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div
            className="reveal-up flex flex-col gap-6 p-6 md:p-8 rounded-2xl"
            style={{
              border: '1px solid rgba(251,191,36,0.14)',
              background: 'rgba(251,191,36,0.04)',
            }}
          >
            <div className="flex items-center gap-4">
              <Image
                src="/images/gdg_quito_logo.webp"
                alt="GDG Quito"
                width={48}
                height={48}
                className="rounded-full shrink-0"
              />
              <h3
                className="font-headline font-black text-foreground"
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
              >
                Google Developer Groups — Quito
              </h3>
            </div>
            <p className="text-sm text-foreground/45 leading-relaxed">
              {t('communityBody')}
            </p>
            <div>
              <BrandLink href="https://gdg.community.dev/gdg-quito/" color="#4285F4" variant="outline">
                {t('communityJoin')} ↗
              </BrandLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEYOND CODE ──────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/0 via-green-950/[0.07] to-green-950/0 pointer-events-none" />
        <div
          className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black select-none pointer-events-none leading-none"
          style={{ top: '14%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-green)' }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i}>{t('wmMusic')}&nbsp;&nbsp;</span>
          ))}
        </div>
        <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
          <SectionLabel animate accent="green" className="mb-6">
            {t('musicBadge')}
          </SectionLabel>
          <Title
            as="h2"
            gradient="green"
            animate
            className="mb-14"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              backgroundImage: 'linear-gradient(90deg, #1DB954, #86efac, #1DB954)',
            }}
          >
            {t('musicTitle')}
          </Title>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Text size="lg" strength="secondary" animate>
              {t('musicBody')}
            </Text>
            <div className="reveal-up flex items-center justify-start md:justify-center">
              <BrandLink href="/why" color="#1DB954" variant="solid" className="font-bold">
                {t('musicLink')} ↗
              </BrandLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto reveal-up text-center flex flex-col items-center">
          <Title as="h2" animate className="mb-6" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
            {t('ctaTitle')}
          </Title>
          <p
            className="text-foreground/45 leading-relaxed mb-10 max-w-xl"
            style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}
          >
            {t('ctaBody')}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" accent="indigo" size="lg" href="/#contact">
              <Mail className="w-4 h-4" />
              {t('ctaPrimary')}
            </Button>
            <Button variant="secondary" accent="neutral" size="lg" href="/">
              {t('ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
