'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, CodeXml } from 'lucide-react';
import { gsap } from 'gsap';
import { navItems } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ThemeToggleButton } from '@/components/common';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
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
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
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
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(link, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/60 backdrop-blur-md shadow-sm border-b border-border/30' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link 
          ref={logoRef}
          href="/" 
          className="flex items-center gap-3 text-2xl font-headline font-bold text-primary hover:text-accent transition-colors group" 
          onClick={closeMobileMenu}
        >
          <div className="relative">
            <CodeXml className="w-8 h-8" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-lg sm:text-2xl">Sebastian Alvarez</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
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
          <ThemeToggleButton className="text-foreground hover:text-primary hover:bg-transparent" />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle mobile menu" className="text-foreground hover:text-primary hover:bg-transparent">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMobile && isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-background/95 backdrop-blur-md animate-in fade-in-20 duration-300 overflow-hidden overscroll-none">
          <button
            onClick={closeMobileMenu}
            className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors z-10"
            aria-label="Close menu"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="h-full w-full flex items-center justify-center overflow-hidden">
            <nav className="flex flex-col items-center space-y-1 w-full px-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="group relative w-full max-w-xs text-center py-6 animate-in slide-in-from-bottom-3 fade-in-0"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  <span className="relative text-2xl font-medium text-foreground/70 group-hover:text-primary transition-colors duration-300">
                    {item.label}
                  </span>
                  
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-16 transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
