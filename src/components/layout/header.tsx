'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, CodeXml, Mail, Github, Linkedin, Twitter, Music } from 'lucide-react';
import { gsap } from 'gsap';
import { navItems, socialLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ThemeToggleButton } from '@/components/common';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/context/theme-context';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuHeaderRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = (href: string) => {
    closeMobileMenu();
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      if (mobileMenuRef.current) {
        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: 'power2.out' }
        );
      }

      if (menuHeaderRef.current) {
        gsap.fromTo(menuHeaderRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out', delay: 0.05 }
        );
      }

      const navItems = navItemsRef.current.filter(Boolean);
      if (navItems.length > 0) {
        gsap.fromTo(navItems,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: 'power2.out', delay: 0.1 }
        );
      }

      const socialIcons = socialLinksRef.current.filter(Boolean);
      if (socialIcons.length > 0) {
        gsap.fromTo(socialIcons,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.04, duration: 0.25, ease: 'power2.out', delay: 0.2 }
        );
      }
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo({ top: scrollY, behavior: 'instant' });
      };
    } else if (!isMobileMenuOpen && mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.in'
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled ? 'bg-background/60 backdrop-blur-sm shadow-sm border-b border-border/30' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link 
          ref={logoRef}
          href="/" 
          className="flex items-center gap-2 font-headline font-bold text-primary transition-colors group" 
          onClick={closeMobileMenu}
        >
          <div className="relative">
            <CodeXml className="w-10 h-10 md:w-6 md:h-6" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          <span className="text-xs sm:text-sm md:text-lg hidden lg:block">Sebastian Alvarez</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
          <Link href="/why" className="flex items-center h-full">
            <Button size="sm" variant="ghost" className="text-[#1DB954]/60 hover:text-[#1DB954] hover:bg-[#1DB954]/5 transition-all duration-300 flex items-center gap-1.5 px-2 py-1 dark:text-[#1DB954]/60 dark:hover:text-[#1DB954] dark:hover:bg-[#1DB954]/5">
              <Music className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Why Listerineh?</span>
            </Button>
          </Link>
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              ref={(el) => { navLinksRef.current[index] = el; }}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="relative text-foreground hover:text-primary font-medium transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <ThemeToggleButton className="text-foreground hover:text-primary hover:bg-transparent ml-2" />
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggleButton className="text-foreground hover:text-primary hover:bg-transparent [&_svg]:w-6 [&_svg]:h-6" />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle mobile menu" className="text-foreground hover:text-primary hover:bg-transparent [&_svg]:w-6 [&_svg]:h-6">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMobile && isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden fixed inset-0 z-[60] bg-background/99 backdrop-blur-xl" style={{ height: '100dvh' }}>
          <div className="flex flex-col h-full">
            {/* Header with close button - Fixed */}
            <div ref={menuHeaderRef} className="flex-shrink-0 flex items-center justify-between p-6 border-b border-border/20">
              <span className="text-2xl font-headline font-bold text-primary">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable content - Navigation items and Social links */}
            <div className="flex-1 overflow-y-auto">
              {/* Navigation items */}
              <nav className="py-8 px-4" aria-label="Mobile navigation">
                <ul className="space-y-3">
                  {navItems.map((item, index) => (
                    <li key={item.label} ref={(el) => { navItemsRef.current[index] = el; }}>
                      <Link
                        href={item.href}
                        onClick={() => handleNavLinkClick(item.href)}
                        className="flex items-center px-6 py-4 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      >
                        <span className="font-semibold text-xl">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/why"
                      onClick={() => handleNavLinkClick('/why')}
                      className="flex items-center gap-2 px-6 py-4 rounded-lg text-[#1DB954]/60 hover:text-[#1DB954] hover:bg-[#1DB954]/5 transition-all duration-200 font-medium dark:text-[#1DB954]/60 dark:hover:text-[#1DB954] dark:hover:bg-[#1DB954]/5"
                    >
                      <Music className="w-4 h-4" />
                      Why Listerineh?
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Social links and theme toggle */}
              <div className="px-4 py-6 border-t border-border/20 space-y-6">
                {/* Follow Me Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Follow Me</h3>
                  <div className="flex gap-3 flex-wrap" aria-label="Social media links">
                    {socialLinks.map((link, index) => (
                      <Link
                        key={link.name}
                        ref={(el) => { socialLinksRef.current[index] = el; }}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${link.name}`}
                        className="relative p-3 rounded-full bg-card/30 backdrop-blur-sm border border-border/50 text-secondary-foreground hover:text-primary hover:border-primary/50 transition-colors group"
                      >
                        <link.icon className="w-5 h-5" />
                        <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Theme Toggle Section */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-border/20">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </div>
                  <ThemeToggleButton className="text-foreground hover:text-primary hover:bg-transparent" />
                </div>
              </div>
            </div>

            {/* Footer - Fixed */}
            <footer className="flex-shrink-0 px-4 py-4 text-center border-t border-border/20">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Sebastian Alvarez. All rights reserved.
              </p>
            </footer>
          </div>
        </div>
      )}
    </header>
  );
}
