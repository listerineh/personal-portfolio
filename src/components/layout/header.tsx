'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Music } from 'lucide-react';
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
    { label: t('projects'), href: '/#projects' },
    { label: t('blog'), href: '/blog' },
    { label: t('contact'), href: '/#contact' },
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
          ? 'bg-transparent'
          : 'bg-[#f5f4f0]/92 dark:bg-[#080808]/92 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06]'
      )}
    >
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          ref={logoRef}
          href="/"
          onClick={closeMobileMenu}
          className="font-headline font-black text-amber-400 tracking-tight leading-none select-none"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
        >
          S·A
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
                    router.push(item.href, { scroll: false });
                  }
                }
              }}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={cn(
                'font-headline text-xs tracking-[0.12em] uppercase font-medium transition-colors duration-200',
                atTop
                  ? 'text-white/55 hover:text-white'
                  : 'text-foreground/55 hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/why"
            className={cn(
              'flex items-center gap-1.5 font-headline text-xs tracking-[0.12em] uppercase font-medium transition-colors duration-200',
              atTop ? 'text-[#1DB954]/60 hover:text-[#1DB954]' : 'text-[#1DB954]/60 hover:text-[#1DB954]'
            )}
          >
            <Music className="w-3 h-3" />
            {t('whyListerineh')}
          </Link>
        </nav>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggleButton className={cn(
            'transition-colors',
            atTop ? 'text-white/55 hover:text-white hover:bg-white/10' : 'text-foreground/55 hover:text-foreground hover:bg-foreground/8'
          )} />
        </div>

        {/* Mobile: controls + burger */}
        <div className="md:hidden flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggleButton className={cn(
            'transition-colors [&_svg]:w-5 [&_svg]:h-5',
            atTop ? 'text-white/55 hover:text-white hover:bg-white/10' : 'text-foreground/55 hover:text-foreground'
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
              <li>
                <Link
                  href="/why"
                  onClick={(e) => handleNavLinkClick(e, '/why')}
                  className="flex items-center gap-2 py-4 font-headline font-black transition-colors duration-200"
                  style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', lineHeight: 1, color: 'rgba(29,185,84,0.4)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#1DB954')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(29,185,84,0.4)')}
                >
                  <Music className="w-6 h-6 shrink-0" />
                  {t('whyListerineh')}
                </Link>
              </li>
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
