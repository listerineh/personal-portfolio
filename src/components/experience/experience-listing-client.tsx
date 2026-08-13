'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import type { Experience } from '@/types';
import { SectionLabel, Title, Text } from '@/components/ds';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceListingClientProps {
  experiences: Experience[];
}

export function ExperienceListingClient({ experiences }: ExperienceListingClientProps) {
  const t = useTranslations('experience');
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.from(item, {
          opacity: 0,
          y: 28,
          duration: 0.5,
          delay: Math.min(index * 0.08, 0.4),
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    });
  }, [experiences.length]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/0 via-amber-950/[0.04] to-amber-950/0 pointer-events-none" />
          <div
            className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black pointer-events-none select-none leading-none"
            style={{ top: '4%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-amber)' }}
          >
            {Array.from({ length: 10 }, (_, i) => <span key={i}>{t('watermark')}&nbsp;&nbsp;</span>)}
          </div>

          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
            <div className="mb-16 text-center">
              <SectionLabel accent="amber" className="mb-6 reveal-up">{t('badge')}</SectionLabel>
              <Title as="h1" animate className="mb-4" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
                {t('pageTitle')}
              </Title>
              <Text size="base" strength="secondary" animate className="max-w-2xl mx-auto">
                {t('pageDescription')}
              </Text>
            </div>

            {experiences.length > 0 ? (
              <div className="divide-y divide-foreground/10">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    ref={(el) => { itemsRef.current[index] = el; }}
                    className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-12 py-16 first:pt-0 last:pb-0"
                  >
                    {/* Dates & location */}
                    <div className="flex flex-row md:flex-col flex-wrap items-center md:items-start gap-x-4 gap-y-1.5">
                      <span className="inline-flex items-center gap-1.5 font-headline text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: '#f59e0b' }}>
                        <Calendar className="w-3 h-3 shrink-0" />
                        {exp.employmentDates}
                      </span>
                      {exp.location && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-foreground/40">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    {/* Role details */}
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="shrink-0">
                          {exp.logoUrl ? (
                            <div className="w-12 h-12 rounded-full overflow-hidden relative" style={{ border: '1px solid rgba(245,158,11,0.2)' }}>
                              <Image src={exp.logoUrl} alt={`${exp.company} logo`} fill className="object-cover" />
                            </div>
                          ) : (
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
                            >
                              <Briefcase className="w-5 h-5 text-foreground/40" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-headline font-bold text-foreground leading-tight" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}>
                            {exp.jobTitle}
                          </h3>
                          <p className="text-sm font-semibold text-foreground/50 mt-0.5">{exp.company}</p>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {exp.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className="mt-2 shrink-0 w-1 h-1 rounded-full"
                              style={{ background: 'rgba(245,158,11,0.5)' }}
                            />
                            <p className="text-sm text-foreground/65 leading-relaxed">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/50 text-lg">No experience found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
