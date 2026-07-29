'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ThemeToggleButton, LanguageSwitcher } from '@/components/common';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocale } from '@/context/locale-context';
import { locales } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { throttle } from '@/lib/performance-utils';

export function Header() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const { locale, setLocale } = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  const navItems = useMemo(() => [
    { label: t('about'), href: '/about' },
    { label: t('experience'), href: '/#experience' },
    { label: t('skills'), href: '/#skills' },
    { label: t('projects'), href: '/projects' },
    { label: t('blog'), href: '/blog' },
    { label: t('contact'), href: '/#contact' },
    { label: 'Why', href: '/why' },
  ], [t]);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuHeaderRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 50);
    }, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(headerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }
    );
  }, [pathname]);

  useEffect(() => {
    if (!logoRef.current) return;

    const logo = logoRef.current;
    const icon = logo.querySelector('svg');
    
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseEnter = () => {
      gsap.to(icon, {
        rotation: 360,
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    logo.addEventListener('mouseenter', handleMouseEnter);
    logo.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      logo.removeEventListener('mouseenter', handleMouseEnter);
      logo.removeEventListener('mouseleave', handleMouseLeave);
    };
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

      return () => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  const openMobileMenu = () => {
    scrollYRef.current = window.scrollY;
    
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    setIsMobileMenuOpen(true);
    
    if (mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: 'power2.out' }
      );
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: 'power2.in',
        onComplete: () => {
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.body.style.overflow = '';
          window.scrollTo({ top: scrollYRef.current, behavior: 'instant' });
        }
      });
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const sectionId = href.substring(2);
      
      if (pathname === '/') {
        const section = document.getElementById(sectionId);
        if (section) {
          closeMobileMenu();
          setTimeout(() => {
            const headerOffset = 100;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }, 100);
        }
      } else {
        closeMobileMenu();
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          router.push(href, { scroll: false });
        }, 150);
      }
    } else {
      closeMobileMenu();
    }
  };

  const atTop = !isScrolled;

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        atTop
          ? 'bg-gradient-to-b from-black/60 via-black/20 to-transparent dark:from-black/40 dark:via-black/15 dark:to-transparent'
          : 'bg-[#f5f4f0]/92 dark:bg-[#080808]/92 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06]'
      )}
    >
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          ref={logoRef}
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2.5 select-none"
        >
          <svg viewBox="0 0 64 64" className="w-8 h-8 shrink-0" xmlns="http://www.w3.org/2000/svg">
            <circle fill="rgb(var(--primary))" cx="32" cy="32" r="32" />
            <g opacity="0.2">
              <path fill="#231F20" d="M42.5,44c-0.7,0-1.3-0.3-1.7-1c-0.6-0.9-0.3-2.2,0.7-2.8l10.1-6.2c0,0,0,0,0-0.1s0,0,0-0.1l-10.1-6.2c-0.9-0.6-1.2-1.8-0.7-2.8c0.6-0.9,1.8-1.2,2.8-0.7l10.6,6.6l0.2,0.2c0.8,0.8,1.2,1.9,1.2,3c0,1.1-0.4,2.2-1.2,3l-0.2,0.2l-10.6,6.6C43.2,43.9,42.8,44,42.5,44z" />
              <path fill="#231F20" d="M21.5,44c-0.4,0-0.7-0.1-1-0.3L9.9,37.1L9.7,37c-0.8-0.8-1.2-1.9-1.2-3c0-1.1,0.4-2.2,1.2-3l0.2-0.2l10.6-6.6c0.9-0.6,2.2-0.3,2.8,0.7c0.6,0.9,0.3,2.2-0.7,2.8l-10.1,6.2c0,0,0,0,0,0.1s0,0,0,0.1l10.1,6.2c0.9,0.6,1.2,1.8,0.7,2.8C22.9,43.7,22.2,44,21.5,44z" />
              <path fill="#231F20" d="M25.5,53c-0.2,0-0.5,0-0.7-0.1c-1-0.4-1.5-1.6-1.2-2.6l13-34c0.4-1,1.6-1.5,2.6-1.2c1,0.4,1.5,1.6,1.2,2.6l-13,34C27.1,52.5,26.3,53,25.5,53z" />
            </g>
            <path fill="#ffffff" d="M42.5,42c-0.7,0-1.3-0.3-1.7-1c-0.6-0.9-0.3-2.2,0.7-2.8l10.1-6.2c0,0,0-0.1,0-0.1l-10.1-6.2c-0.9-0.6-1.2-1.8-0.7-2.8c0.6-0.9,1.8-1.2,2.8-0.7l10.6,6.6l0.2,0.2c1.6,1.6,1.6,4.3,0,6l-0.2,0.2l-10.6,6.6C43.2,41.9,42.8,42,42.5,42z" />
            <path fill="#ffffff" d="M21.5,42c-0.4,0-0.7-0.1-1-0.3L9.9,35.1L9.7,35c-1.6-1.6-1.6-4.3,0-6l0.2-0.2l10.6-6.6c0.9-0.6,2.2-0.3,2.8,0.7c0.6,0.9,0.3,2.2-0.7,2.8l-10.1,6.2c0,0,0,0.1,0,0.1l10.1,6.2c0.9,0.6,1.2,1.8,0.7,2.8C22.9,41.7,22.2,42,21.5,42z" />
            <path fill="#ffffff" d="M25.5,51c-0.2,0-0.5,0-0.7-0.1c-1-0.4-1.5-1.6-1.2-2.6l13-34c0.4-1,1.6-1.5,2.6-1.2c1,0.4,1.5,1.6,1.2,2.6l-13,34C27.1,50.5,26.3,51,25.5,51z" />
          </svg>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              ref={(el) => { navLinksRef.current[index] = el; }}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith('/#')) {
                  e.preventDefault();
                  const sectionId = item.href.substring(2);
                  if (pathname === '/') {
                    const section = document.getElementById(sectionId);
                    if (section) {
                      const headerOffset = 100;
                      const offsetPosition = section.getBoundingClientRect().top + window.scrollY - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  } else {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    router.push(item.href, { scroll: false });
                  }
                }
              }}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={cn(
                'font-headline text-xs tracking-[0.12em] uppercase font-medium transition-colors duration-200',
                atTop
                  ? 'text-white/85 hover:text-white'
                  : 'text-foreground/55 hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-1">
          <LanguageSwitcher className={cn(
            'transition-colors',
            atTop ? 'text-white/85 hover:text-white hover:bg-white/10' : 'text-foreground/55 hover:text-foreground hover:bg-foreground/8'
          )} />
          <ThemeToggleButton className={cn(
            'transition-colors',
            atTop ? 'text-white/85 hover:text-white hover:bg-white/10' : 'text-foreground/55 hover:text-foreground hover:bg-foreground/8'
          )} />
        </div>

        {/* Mobile: controls + burger */}
        <div className="md:hidden flex items-center gap-1">
          <LanguageSwitcher className={cn(
            'transition-colors',
            atTop ? 'text-white/85 hover:text-white hover:bg-white/10' : 'text-foreground/55 hover:text-foreground'
          )} />
          <ThemeToggleButton className={cn(
            'transition-colors [&_svg]:w-5 [&_svg]:h-5',
            atTop ? 'text-white/85 hover:text-white hover:bg-white/10' : 'text-foreground/55 hover:text-foreground'
          )} />
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className={cn(
              'p-2 rounded-lg transition-colors',
              atTop ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-foreground/70 hover:text-foreground hover:bg-foreground/8'
            )}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — always cinematic dark */}
      {isMobile && isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 z-[60] flex flex-col"
          style={{ height: '100dvh', background: '#080808' }}
        >
          {/* Top bar */}
          <div ref={menuHeaderRef} className="flex-shrink-0 flex items-center justify-between px-6 py-5">
            <span className="font-headline font-black text-amber-400 text-xl">S·A</span>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-white/40 hover:text-white transition-colors rounded-lg"
              aria-label={tCommon('close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-6 pt-8" aria-label="Mobile navigation">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={item.label} ref={(el) => { navItemsRef.current[index] = el; }}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavLinkClick(e, item.href)}
                    className="block py-4 font-headline font-black text-white/40 hover:text-white transition-colors duration-200"
                    style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', lineHeight: 1 }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Bottom controls */}
            <div className="mt-16 pb-8 flex items-center justify-between">
              <div className="flex gap-2">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { if (loc !== locale) setLocale(loc); }}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-headline font-bold tracking-widest uppercase transition-all',
                      locale === loc
                        ? 'bg-amber-400 text-black'
                        : 'text-white/30 hover:text-white border border-white/10 hover:border-white/30'
                    )}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
              <ThemeToggleButton className="text-white/40 hover:text-white hover:bg-white/10" />
            </div>
          </nav>

          {/* Footer */}
          <div className="flex-shrink-0 px-6 py-4 border-t border-white/5">
            <p className="text-xs text-white/20 font-headline">
              © {new Date().getFullYear()} Sebastian Alvarez
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
