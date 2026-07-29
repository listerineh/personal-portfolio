'use client';

import { Fragment, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socialLinks } from '@/lib/data';
import { CookieSettingsLink } from '@/components/common/cookie-settings-link';
import { NewsletterSubscribe } from '@/components/blog/newsletter-subscribe';
import { Pill } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const t = useTranslations('nav');
  const tNewsletter = useTranslations('newsletter');
  const tCommon = useTranslations('common');
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const navItems = [
    { label: t('about'), href: '/about' },
    { label: t('experience'), href: '/#experience' },
    { label: t('skills'), href: '/#skills' },
    { label: t('projects'), href: '/#projects' },
    { label: t('blog'), href: '/blog' },
    { label: t('contact'), href: '/#contact' },
    { label: 'Why', href: '/why' },
  ];

  useEffect(() => {
    if (!footerRef.current) return;

    const timer = setTimeout(() => {
      if (!footerRef.current) return;

      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion && bgRef.current) {
        gsap.fromTo(bgRef.current,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      const navLinks = navLinksRef.current.filter(Boolean);
      const socialIcons = socialIconsRef.current.filter(Boolean);

      if (navLinks.length === 0 || socialIcons.length === 0 || !copyrightRef.current) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(navLinks,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.03,
          duration: 0.3,
          ease: 'power2.out',
        }
      )
      .fromTo(socialIcons,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.03,
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.2')
      .fromTo(copyrightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.15');
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [pathname]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    socialIconsRef.current.forEach((icon) => {
      if (!icon) return;

      const handleMouseEnter = () => {
        gsap.to(icon, {
          y: -4,
          scale: 1.08,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(icon, {
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      icon.addEventListener('mouseenter', handleMouseEnter);
      icon.addEventListener('mouseleave', handleMouseLeave);
    });
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    navLinksRef.current.forEach((link) => {
      if (!link) return;

      const handleMouseEnter = () => {
        gsap.to(link, {
          y: -2,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(link, {
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden" style={{ background: '#080808' }}>

      {/* Parallax photo background */}
      <div ref={bgRef} className="absolute inset-0 scale-[1.25] origin-center pointer-events-none">
        <Image
          src="/images/footer-photo.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.55) 40%, rgba(8,8,8,0.88) 100%)' }} />
      </div>
      {/* Extra darkening overlay — static, outside parallax */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Newsletter section */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 pt-28 md:pt-36 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">

            {/* Left — copy */}
            <div className="space-y-6 text-center md:text-left">
              <Pill variant="outline" accent="amber" className="inline-flex">{tNewsletter('badge')}</Pill>
              <h2
                className="font-headline font-black leading-[0.9] text-transparent bg-clip-text"
                style={{
                  fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                  backgroundImage: 'linear-gradient(90deg, rgb(var(--primary)), rgb(var(--primary-light)), rgb(var(--primary)))',
                }}
              >
                {tNewsletter('title')}{' '}
                <span className="text-primary/60">{tNewsletter('titleGradient')}</span>
              </h2>
              <p className="text-white/45 leading-relaxed max-w-sm mx-auto md:mx-0" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                {tNewsletter('description')}
              </p>
              <div className="flex justify-center md:justify-start gap-8 pt-2">
                {[
                  { label: tNewsletter('monthlyLabel'), sub: tNewsletter('monthlyValue') },
                  { label: tNewsletter('spamLabel'), sub: tNewsletter('spamValue') },
                  { label: tNewsletter('freeLabel'), sub: tNewsletter('freeValue') },
                ].map(({ label, sub }) => (
                  <div key={label}>
                    <div className="font-headline font-black text-2xl text-primary">{label}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1">{sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="flex items-center">
              <div className="w-full">
                <NewsletterSubscribe variant="bare" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 mx-6 sm:mx-10 md:mx-16 lg:mx-24 h-px bg-white/8" />

      {/* Big name + nav */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">

            {/* Nav links — list on mobile, horizontal with separators on desktop */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col lg:flex-row lg:flex-wrap items-center gap-2 lg:gap-x-2 lg:gap-y-4">
                {navItems.map((link, index) => (
                  <Fragment key={link.label}>
                    <li>
                      <Link
                        ref={(el) => { navLinksRef.current[index] = el; }}
                        href={link.href}
                        className="font-headline text-sm lg:text-xs tracking-[0.12em] uppercase text-white/35 hover:text-white transition-colors duration-200 px-2 py-1.5 lg:py-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                    {index < navItems.length - 1 && (
                      <li className="hidden lg:block text-white/15 select-none text-xs">·</li>
                    )}
                  </Fragment>
                ))}
              </ul>
            </nav>

            {/* Social icons */}
            <div className="flex justify-center lg:justify-start gap-5 lg:gap-4" aria-label="Social media links">
              {socialLinks.map((link, index) => (
                <Link
                  key={link.name}
                  ref={(el) => { socialIconsRef.current[index] = el; }}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${tCommon('visitSocial')} ${link.name}`}
                  className="p-3 lg:p-2.5 rounded-xl border border-white/10 text-white/30 hover:text-primary hover:border-primary/30 transition-colors duration-200"
                >
                  <link.icon className="w-5 h-5 lg:w-4 lg:h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div ref={copyrightRef} className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 py-6 md:py-5 pb-24 md:pb-5 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-5">
          <p className="font-headline text-xs text-white/25 text-center sm:text-left">
            &copy; {currentYear} Sebastian Alvarez — {tCommon('allRightsReserved')}
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center gap-3 sm:gap-5 text-xs sm:text-xs text-white/25">
            <CookieSettingsLink className="block w-full text-center sm:w-auto text-xs sm:text-xs text-white/25 hover:text-primary transition-colors py-2 sm:py-0" />
            <Link href="/privacy" className="block w-full text-center sm:w-auto hover:text-primary transition-colors py-2 sm:py-0">
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms" className="block w-full text-center sm:w-auto hover:text-primary transition-colors py-2 sm:py-0">
              {t('termsOfUse')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
