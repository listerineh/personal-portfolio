"use client";

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { ArrowDown, FileText } from 'lucide-react';
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
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } });
      tl.from(eyebrowRef.current, { opacity: 0, y: 16, duration: 0.7 })
        .from(titleRef.current, { opacity: 0, y: 56, duration: 1 }, '-=0.4')
        .from(subtitleRef.current, { opacity: 0, y: 24, duration: 0.7 }, '-=0.5');
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
      </div>

      {/* Content — bottom left */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24 pb-16 md:pb-28">
        <span
          ref={eyebrowRef}
          className="block font-headline text-xs tracking-[0.35em] uppercase mb-5"
          style={{ color: 'rgb(var(--primary))' }}
        >
          {t('subtitle')}
        </span>

        <h1
          ref={titleRef}
          className="font-headline font-black leading-[0.88] text-white mb-7"
        >
          <span className="block" style={{ fontSize: 'clamp(3.2rem, 10vw, 9rem)' }}>
            Sebastian
          </span>
          <span
            className="block text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(3rem, 9.5vw, 8.5rem)',
              backgroundImage: 'linear-gradient(90deg, rgb(var(--primary)), rgb(var(--primary-light)), rgb(var(--primary)))',
            }}
          >
            Alvarez
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="max-w-sm md:max-w-md text-white/55 text-base md:text-lg leading-relaxed mb-6"
        >
          {t('description')}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-8 mb-8 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-headline font-black" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'rgb(var(--primary))' }}>6+</span>
            <span className="text-[10px] font-headline tracking-[0.2em] uppercase text-white/35 leading-tight">
              Years<br />Exp.
            </span>
          </div>
          <div className="w-px h-8 bg-white/15" />
          <div className="flex items-center gap-2">
            <span className="font-headline font-black text-white/70" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>100%</span>
            <span className="text-[10px] font-headline tracking-[0.2em] uppercase text-white/35 leading-tight">
              Remote<br />Ready
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            accent="amber"
            size="md"
            gradient="linear-gradient(90deg, rgb(var(--primary)), rgb(var(--primary-light)))"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/docs/CV_SebastianAlvarez_FS_EN.pdf';
              link.download = 'CV_SebastianAlvarez_EN.pdf';
              link.click();
              toast({ title: t('cvDownloadedTitle'), description: t('cvDownloadedDescription') });
            }}
            className="text-black hover:shadow-[0_0_40px_rgba(245,158,11,0.35)]"
          >
            <FileText className="w-4 h-4" />
            {t('downloadCV')}
          </Button>
          <Button variant="ghost" accent="neutral" size="md" href="#contact" className="text-white/70 hover:text-white border border-white/20 hover:border-white/40">
            {t('getInTouch')}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-14 z-10 flex flex-col items-center gap-3 text-white/30">
        <span className="text-[10px] tracking-[0.25em] uppercase font-headline">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
