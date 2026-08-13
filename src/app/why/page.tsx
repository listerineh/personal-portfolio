'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowDown, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SpotifyPlayer } from '@/components/common/spotify-player';
import { ThemeToggleButton } from '@/components/common/theme-toggle-button';
import { useTheme } from '@/context/theme-context';
import { LanguageSwitcher } from '@/components/common/language-switcher';
import { useGSAP } from '@/hooks/use-gsap';
import { musicLinks } from '@/lib/data';
import { Pill, Button, SectionLabel, Title, Text, AccentCard, MemberCard, SpotifyTopTracks } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyPage() {
  const t = useTranslations('why');
  const { theme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLSpanElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && heroBgRef.current && heroRef.current) {
      gsap.to(heroBgRef.current, {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (!prefersReducedMotion && ctaBgRef.current && ctaRef.current) {
      gsap.fromTo(ctaBgRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    if (!prefersReducedMotion) {
      const heroTl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.out' } });
      heroTl
        .from(heroEyebrowRef.current, { opacity: 0, y: 16, duration: 0.7 })
        .from(heroTitleRef.current, { opacity: 0, y: 48, duration: 0.9 }, '-=0.4')
        .from(heroSubtitleRef.current, { opacity: 0, y: 24, duration: 0.7 }, '-=0.5');

      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((container) => {
        gsap.from(Array.from(container.children), {
          opacity: 0,
          y: 36,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }
  }, []);

  const members = [
    { nameKey: 'mnMember1Name' as const, roleKey: 'mnMember1Role' as const },
    { nameKey: 'mnMember2Name' as const, roleKey: 'mnMember2Role' as const },
    { nameKey: 'mnMember3Name' as const, roleKey: 'mnMember3Role' as const },
    { nameKey: 'mnMember4Name' as const, roleKey: 'mnMember4Role' as const },
  ];

  const ssMembers = [
    { nameKey: 'ssMember1Name' as const, roleKey: 'ssMember1Role' as const },
    { nameKey: 'ssMember2Name' as const, roleKey: 'ssMember2Role' as const },
    { nameKey: 'ssMember3Name' as const, roleKey: 'ssMember3Role' as const },
  ];

  return (
    <div
      className="why-page min-h-screen overflow-x-hidden"
    >
      <style>{`
        .why-page {
          font-family: var(--font-outfit), sans-serif;
          background-color: #f5f4f0;
          color: #111111;
        }
        .dark .why-page {
          background-color: #080808;
          color: #f0f0f0;
        }
        .why-page section { opacity: 1 !important; }
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px 200px;
        }

      `}</style>

      <div className="grain-overlay fixed inset-0 pointer-events-none z-[9998] opacity-[0.025] mix-blend-overlay" />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black">
        {t('skipToContent')}
      </a>

      <div className="fixed top-5 left-5 z-[9999]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-white/50 dark:hover:text-white transition-colors duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline font-medium">{t('backToPortfolio')}</span>
        </Link>
      </div>

      <div className="fixed top-5 right-5 z-[9999] flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggleButton className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 border-gray-200 dark:text-white/50 dark:hover:text-white dark:hover:bg-white/10 dark:border-white/10" />
      </div>

      <main id="main-content">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative h-screen min-h-[600px] overflow-hidden flex items-end"
        >
          <div ref={heroBgRef} className="absolute inset-0 scale-[1.12] origin-top">
            <Image
              src="/images/sebas-playing.webp"
              alt="Sebastian Alvarez playing guitar"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
          </div>

          <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 pb-16 md:pb-28">
            <span
              ref={heroEyebrowRef}
              className="block font-headline text-amber-400 text-xs tracking-[0.35em] uppercase mb-5"
            >
              {t('heroEyebrow')}
            </span>
            <h1 ref={heroTitleRef} className="font-headline font-bold leading-[0.9] text-white">
              <span className="block" style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}>{t('heroWhy')}</span>
              <span
                className="block text-transparent bg-clip-text"
                style={{
                  fontSize: 'clamp(3rem, 9.5vw, 8.5rem)',
                  backgroundImage: 'linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b)',
                }}
              >
                Listerineh?
              </span>
            </h1>
            <p
              ref={heroSubtitleRef}
              className="mt-7 max-w-sm md:max-w-md text-white/60 text-base md:text-lg leading-relaxed"
            >
              {t('heroSubtitle')}
            </p>
          </div>

          <div className="absolute bottom-8 right-8 md:right-14 z-10 flex flex-col items-center gap-3 text-white/30">
            <span className="text-[10px] tracking-[0.25em] uppercase font-headline">{t('scrollToExplore')}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </section>

        {/* ── ORIGIN / THE NAME ─────────────────────────────────────────────── */}
        <section className="relative py-28 md:py-44 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
            <SectionLabel animate className="mb-8">{t('originBadge')}</SectionLabel>
            <Title as="h2" animate className="mb-12" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
              {t('originHeadline')}
            </Title>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              <Text size="lg" strength="secondary" animate className="md:text-xl">{t('originParagraph1')}</Text>
              <Text size="lg" strength="secondary" animate className="md:text-xl">{t('originParagraph2')}</Text>
            </div>
          </div>
        </section>

        {/* ── MARGARITA NUGGET ──────────────────────────────────────────────── */}
        <section className="relative py-28 md:py-44 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/0 via-amber-950/[0.07] to-amber-950/0 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">

            <div className="reveal-up flex flex-wrap items-center gap-3 mb-10">
              <Pill color="#f59e0b">{t('mnBadge')}</Pill>
              <Pill color="#f59e0b" variant="outline">{t('mnStatus')}</Pill>
            </div>

            <Title
              as="h2"
              gradient="amber"
              animate
              className="mb-8 pb-4 leading-none"
              style={{ fontSize: 'clamp(2.8rem, 10vw, 9rem)' }}
            >
              {t('mnTitle')}
            </Title>
            <p className="reveal-up font-headline text-[10px] tracking-[0.35em] uppercase mb-16" style={{ color: '#f59e0b' }}>
              {t('mnGenre')}
            </p>

            <div className="grid md:grid-cols-2 gap-12 md:gap-24">
              <div className="space-y-6">
                <Text size="lg" strength="primary" accent="amber" animate>{t('mnDescription')}</Text>
                <Text size="base" strength="secondary" accent="amber" animate>{t('mnDescription2')}</Text>
                <div className="reveal-up pt-2">
                  <Button
                    href={musicLinks.mn.linktree}
                    external
                    gradient="linear-gradient(90deg, #f59e0b, #fcd34d)"
                    className="gap-3 text-black hover:shadow-[0_0_40px_rgba(245,158,11,0.35)] hover:scale-[1.03] w-full sm:w-auto justify-center"
                  >
                    {t('mnLinktree')}
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <SectionLabel accent="amber" animate className="mb-6">{t('mnMembersTitle')}</SectionLabel>
                <div className="reveal-stagger grid grid-cols-2 gap-3">
                  {members.map(({ nameKey, roleKey }) => (
                    <MemberCard
                      key={nameKey}
                      name={t(nameKey)}
                      role={t(roleKey)}
                      accent="amber"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Featured video */}
            <div className="reveal-up mt-16">
              <SectionLabel accent="amber" className="mb-5">{t('mnVideoTitle')}</SectionLabel>
              <div
                className="relative w-full overflow-hidden rounded-2xl"
                style={{ aspectRatio: '16/9', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${musicLinks.mn.featuredVideoId}?rel=0&modestbranding=1`}
                  title="Margarita Nugget"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            <div className="reveal-up mt-12">
              <SectionLabel accent="amber" className="mb-5">{t('topTracksTitle')}</SectionLabel>
              <SpotifyTopTracks tracks={musicLinks.mn.topTracks} accentColor="#f59e0b" />
            </div>
          </div>

          <div
            className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black pointer-events-none select-none leading-none"
            style={{
              top: '8%',
              fontSize: 'clamp(7rem, 18vw, 14rem)',
              color: theme === 'dark' ? 'rgba(251,191,36,0.05)' : 'rgba(217,119,6,0.1)',
            }}
          >
            {Array.from({ length: 12 }, (_, i) => <span key={i}>MN&nbsp;&nbsp;</span>)}
          </div>
        </section>

        {/* ── SOFONES SOLARES ───────────────────────────────────────────────── */}
        <section className="relative py-28 md:py-44 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/0 via-indigo-950/[0.07] to-indigo-950/0 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">

            <div className="reveal-up flex flex-wrap items-center gap-3 mb-10">
              <Pill color="#818cf8">{t('ssBadge')}</Pill>
              <Pill color="#818cf8" variant="outline">{t('ssPaused')}</Pill>
            </div>

            <Title
              as="h2"
              gradient="indigo"
              animate
              className="mb-3 leading-none"
              style={{
                fontSize: 'clamp(2.8rem, 10vw, 9rem)',
                backgroundImage: 'linear-gradient(90deg, #818cf8, #c4b5fd, #818cf8)',
              }}
            >
              {t('ssTitle')}
            </Title>
            <p className="reveal-up font-headline text-[10px] tracking-[0.35em] uppercase mb-16" style={{ color: '#818cf8' }}>
              {t('ssGenre')}
            </p>

            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
              <div className="space-y-6">
                <Text size="lg" strength="primary" accent="indigo" animate>{t('ssDescription')}</Text>
                <Text size="base" strength="secondary" accent="indigo" animate>{t('ssDescription2')}</Text>
                <AccentCard accent="indigo" animate className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="font-headline text-indigo-400 text-[10px] tracking-[0.25em] uppercase">
                      {t('ssAlbumNote')}
                    </span>
                  </div>
                  <Text size="sm" strength="secondary" accent="indigo">{t('ssAlbumDesc')}</Text>
                </AccentCard>
                <div className="reveal-up pt-2">
                  <Button
                    href={musicLinks.ss.instagram}
                    external
                    gradient="linear-gradient(90deg, #818cf8, #c4b5fd)"
                    className="gap-3 text-black hover:shadow-[0_0_40px_rgba(129,140,248,0.35)] hover:scale-[1.03] w-full sm:w-auto justify-center"
                  >
                    {t('soloIG')}
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <SectionLabel accent="indigo" animate className="mb-6">{t('ssMembersTitle')}</SectionLabel>
                <div className="reveal-stagger grid grid-cols-2 gap-3">
                  {ssMembers.map(({ nameKey, roleKey }) => (
                    <MemberCard
                      key={nameKey}
                      name={t(nameKey)}
                      role={t(roleKey)}
                      accent="indigo"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal-up mt-12">
              <SectionLabel accent="indigo" className="mb-5">{t('topTracksTitle')}</SectionLabel>
              <SpotifyTopTracks tracks={musicLinks.ss.topTracks} accentColor="#818cf8" />
            </div>
          </div>

          <div
            className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black pointer-events-none select-none leading-none"
            style={{
              top: '8%',
              fontSize: 'clamp(7rem, 18vw, 14rem)',
              color: theme === 'dark' ? 'rgba(129,140,248,0.05)' : 'rgba(99,102,241,0.1)',
            }}
          >
            {Array.from({ length: 12 }, (_, i) => <span key={i}>SS&nbsp;&nbsp;</span>)}
          </div>
        </section>

        {/* ── LISTERINEH SOLO ───────────────────────────────────────────────── */}
        <section className="relative py-28 md:py-44 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-950/0 via-green-950/[0.07] to-green-950/0 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">

            <div className="reveal-up flex flex-wrap items-center gap-3 mb-10">
              <Pill color="#1DB954">{t('soloBadge')}</Pill>
            </div>

            <Title
              as="h2"
              gradient="green"
              animate
              className="mb-3 leading-none"
              style={{
                fontSize: 'clamp(3rem, 10vw, 9rem)',
                backgroundImage: 'linear-gradient(90deg, #1DB954, #86efac, #1DB954)',
              }}
            >
              Listerineh
            </Title>
            <p className="reveal-up font-headline text-[#1DB954] dark:text-[#1DB954]/80 text-[10px] tracking-[0.35em] uppercase mb-16">
              {t('soloGenre')}
            </p>

            <div>
              <Text size="lg" strength="primary" accent="green" animate className="mb-10">{t('soloDescription')}</Text>
              <div className="reveal-up mb-14">
                <Button
                  href={musicLinks.solo.instagram}
                  external
                  gradient="linear-gradient(90deg, #1DB954, #86efac)"
                  className="gap-3 text-black hover:shadow-[0_0_40px_rgba(29,185,84,0.35)] hover:scale-[1.03] w-full sm:w-auto justify-center"
                >
                  {t('soloIG')}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              <div className="reveal-up mt-16">
                <SectionLabel accent="green" className="mb-5">{t('topTracksTitle')}</SectionLabel>
                <SpotifyTopTracks tracks={musicLinks.solo.topTracks} accentColor="#1DB954" />
              </div>
            </div>
          </div>

          <div
            className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black pointer-events-none select-none leading-none"
            style={{
              top: '8%',
              fontSize: 'clamp(7rem, 18vw, 14rem)',
              color: theme === 'dark' ? 'rgba(29,185,84,0.06)' : 'rgba(29,185,84,0.1)',
            }}
          >
            {Array.from({ length: 12 }, (_, i) => <span key={i}>LH&nbsp;&nbsp;</span>)}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section
          ref={ctaRef}
          className="relative overflow-hidden flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24"
          style={{ minHeight: '90vh' }}
        >
          {/* Parallax background */}
          <div ref={ctaBgRef} className="absolute inset-0 scale-[1.25] origin-center">
            <Image
              src="/images/sebas-playing-footer.webp"
              alt="Sebastian Alvarez performing"
              fill
              className="object-cover object-center"
            />
          </div>
          {/* Overlays — static, outside parallax div */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

          <div className="relative z-10 max-w-3xl mx-auto text-center py-24">
            <SectionLabel animate className="mb-8 text-white/80">{t('ctaBadge')}</SectionLabel>
            <Title as="h2" animate className="mb-6 text-white" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}>
              {t('ctaTitle')}
            </Title>
            <p className="reveal-up text-lg text-white/80 leading-relaxed mb-12">{t('ctaDescription')}</p>
            <div className="reveal-up flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button variant="primary" accent="neutral" href="/#contact">
                {t('getInTouch')}
              </Button>
              <Link href="/" className="font-headline font-bold text-sm text-white/60 hover:text-white transition-colors duration-300 underline-offset-4 hover:underline">
                {t('backToPortfolio')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
