'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ThemeToggleButton } from '@/components/common/theme-toggle-button';
import { LanguageSwitcher } from '@/components/common/language-switcher';
import { useGSAP } from '@/hooks/use-gsap';
import { musicLinks } from '@/lib/data';
import { Pill, Button, Title, Text, AccentCard, MemberCard, SpotifyTopTracks } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

export default function WhyPage() {
  const t = useTranslations('why');
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
      const heroTl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } });
      heroTl
        .from(heroEyebrowRef.current, { opacity: 0, y: 12, duration: 0.5 })
        .from(heroTitleRef.current, { opacity: 0, y: 24, duration: 0.6 }, '-=0.25')
        .from(heroSubtitleRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.3');

      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((container) => {
        gsap.from(Array.from(container.children), {
          opacity: 0,
          y: 16,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    }
  }, []);

  return (
    <div
      className="why-page min-h-screen overflow-x-hidden"
    >
      <style>{`
        .why-page {
          font-family: var(--font-outfit), sans-serif;
          background-color: var(--surface-deep);
        }
        .why-page section { opacity: 1 !important; }

      `}</style>

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black">
        {t('skipToContent')}
      </a>

      <div className="fixed top-5 left-5 z-[9999]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] transition-colors duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline font-medium">{t('backToPortfolio')}</span>
        </Link>
      </div>

      <div className="fixed top-5 right-5 z-[9999] flex items-center gap-2">
        <LanguageSwitcher className="text-white/70 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]" />
        <ThemeToggleButton className="text-white/70 hover:text-white hover:bg-white/10 border-white/20 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]" />
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
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent" />
          </div>

          <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 pb-16 md:pb-28">
            <span
              ref={heroEyebrowRef}
              className="block font-headline text-amber-400 text-xs tracking-[0.35em] uppercase mb-5 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]"
            >
              {t('heroEyebrow')}
            </span>
            <h1 ref={heroTitleRef} className="font-headline font-black leading-[0.9] text-white text-display [text-shadow:0_3px_30px_rgba(0,0,0,0.75)]">
              <span className="block [text-shadow:0_3px_30px_rgba(0,0,0,0.75)]">{t('heroWhy')}</span>
              <span className="block text-amber-400 [text-shadow:0_2px_20px_rgba(0,0,0,0.85)]">
                Listerineh?
              </span>
            </h1>
            <p
              ref={heroSubtitleRef}
              className="mt-7 max-w-sm md:max-w-md text-white/85 text-base md:text-lg leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]"
            >
              {t('heroSubtitle')}
            </p>
          </div>

        </section>

        {/* ── ORIGIN / THE NAME ─────────────────────────────────────────────── */}
        <section className="relative py-28 md:py-44 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
            <Title as="h2" animate className="mb-12 text-display-sm">
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
              animate
              className="mb-8 pb-4 leading-none text-primary text-display"
            >
              {t('mnTitle')}
            </Title>
            <p className="reveal-up font-headline text-[10px] tracking-[0.35em] uppercase mb-16 text-amber-400">
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
                    accent="amber"
                    variant="primary"
                    className="gap-3 w-full sm:w-auto justify-center"
                  >
                    {t('mnLinktree')}
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="font-headline text-xs tracking-[0.2em] uppercase text-amber-500/70 mb-6">{t('mnMembersTitle')}</p>
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
              <p className="font-headline text-xs tracking-[0.2em] uppercase text-amber-500/70 mb-5">{t('mnVideoTitle')}</p>
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-amber-500/20 aspect-video"
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
              <p className="font-headline text-xs tracking-[0.2em] uppercase text-amber-500/70 mb-5">{t('topTracksTitle')}</p>
              <SpotifyTopTracks tracks={musicLinks.mn.topTracks} accentColor="#f59e0b" />
            </div>
          </div>


        </section>

        {/* ── SOFONES SOLARES ───────────────────────────────────────────────── */}
        <section className="relative py-28 md:py-44 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ss-accent)]/0 via-[var(--ss-accent)]/[0.07] to-[var(--ss-accent)]/0 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">

            <div className="reveal-up flex flex-wrap items-center gap-3 mb-10">
              <Pill color="#818cf8">{t('ssBadge')}</Pill>
              <Pill color="#818cf8" variant="outline">{t('ssPaused')}</Pill>
            </div>

            <Title
              as="h2"
              animate
              className="mb-3 leading-none text-indigo-400 text-display"
            >
              {t('ssTitle')}
            </Title>
            <p className="reveal-up font-headline text-[10px] tracking-[0.35em] uppercase mb-16 text-indigo-400">
              {t('ssGenre')}
            </p>

            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
              <div className="space-y-6">
                <Text size="lg" strength="primary" accent="indigo" animate>{t('ssDescription')}</Text>
                <Text size="base" strength="secondary" accent="indigo" animate>{t('ssDescription2')}</Text>
                <AccentCard accent="indigo" animate className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
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
                    variant="primary"
                    className="gap-3 bg-indigo-400 text-black hover:bg-indigo-300 w-full sm:w-auto justify-center"
                  >
                    {t('soloIG')}
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="font-headline text-xs tracking-[0.2em] uppercase text-indigo-400/70 mb-6">{t('ssMembersTitle')}</p>
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
              <p className="font-headline text-xs tracking-[0.2em] uppercase text-indigo-400/70 mb-5">{t('topTracksTitle')}</p>
              <SpotifyTopTracks tracks={musicLinks.ss.topTracks} accentColor="#818cf8" />
            </div>
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
              animate
              className="mb-3 leading-none text-green-500 text-display"
            >
              Listerineh
            </Title>
            <p className="reveal-up font-headline text-green-500 text-[10px] tracking-[0.35em] uppercase mb-16">
              {t('soloGenre')}
            </p>

            <div>
              <Text size="lg" strength="primary" accent="green" animate className="mb-10">{t('soloDescription')}</Text>
              <div className="reveal-up mb-14">
                <Button
                  href={musicLinks.solo.instagram}
                  external
                  variant="primary"
                  className="gap-3 bg-green-500 text-black hover:bg-green-400 w-full sm:w-auto justify-center"
                >
                  {t('soloIG')}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              <div className="reveal-up mt-16">
                <p className="font-headline text-xs tracking-[0.2em] uppercase text-green-500/70 mb-5">{t('topTracksTitle')}</p>
                <SpotifyTopTracks tracks={musicLinks.solo.topTracks} accentColor="#1DB954" />
              </div>
            </div>
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
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Overlays — static, outside parallax div */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

          <div className="relative z-10 max-w-3xl mx-auto text-center py-24">
            <Title as="h2" animate className="mb-6 !text-white text-display-sm">
              {t('ctaTitle')}
            </Title>
            <p className="reveal-up text-lg text-white/80 leading-relaxed mb-12">{t('ctaDescription')}</p>
            <div className="reveal-up flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button variant="primary" accent="neutral" href="/contact">
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
