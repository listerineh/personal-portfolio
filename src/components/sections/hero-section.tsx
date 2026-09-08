"use client";

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { FileText } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const t = useTranslations('hero');
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && bgRef.current && sectionRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (!prefersReducedMotion) {
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } });
      tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.5 })
        .from(titleRef.current, { opacity: 0, y: 24, duration: 0.6 }, '-=0.25')
        .from(subtitleRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.3');
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[600px] overflow-hidden flex items-end"
    >
      {/* Parallax background photo */}
      <div ref={bgRef} className="absolute inset-0 scale-[1.12] origin-top">
        <Image
          src="/images/hero-photo.webp"
          alt="Sebastian Alvarez"
          fill
          priority
          fetchPriority="high"
          quality={90}
          className="object-cover object-top"
        />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-[var(--surface-deep)] via-black/50 to-black/20" />
      </div>

      {/* Content — bottom left */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 pb-16 md:pb-28">
        <span
          ref={eyebrowRef}
          className="block font-headline text-xs tracking-[0.35em] uppercase mb-5 text-primary"
        >
          {t('subtitle')}
        </span>

        <h1 ref={titleRef} className="font-headline font-black text-display text-white mb-7">
          <span className="block">Sebastian</span>
          <span className="block text-primary">Alvarez</span>
        </h1>

        <p
          ref={subtitleRef}
          className="max-w-sm md:max-w-md text-white/55 text-base md:text-lg leading-relaxed mb-6"
        >
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            variant="primary"
            accent="amber"
            size="md"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/docs/CV_SebastianAlvarez_FS_EN.pdf';
              link.download = 'CV_SebastianAlvarez_EN.pdf';
              link.click();
              toast({ title: t('cvDownloadedTitle'), description: t('cvDownloadedDescription') });
            }}
            className="w-full sm:w-auto justify-center hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]"
          >
            <FileText className="w-4 h-4" />
            {t('downloadCV')}
          </Button>
          <Button variant="ghost" accent="neutral" size="md" href="#contact" className="w-full sm:w-auto justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/5">
            {t('getInTouch')}
          </Button>
        </div>
      </div>
    </section>
  );
}
