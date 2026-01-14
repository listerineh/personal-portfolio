'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navItems, socialLinks } from '@/lib/data';
import { CookieSettingsLink } from '@/components/common/cookie-settings-link';
import { NewsletterSubscribe } from '@/components/blog/newsletter-subscribe';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!footerRef.current) return;

    const timer = setTimeout(() => {
      if (!footerRef.current) return;

      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });

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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power3.out',
        }
      )
      .fromTo(socialIcons,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        }, '-=0.3')
      .fromTo(copyrightRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.2');
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
          y: -6,
          scale: 1.1,
          rotation: 360,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(icon, {
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
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
    });
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-t from-secondary/60 via-secondary/40 to-secondary/20 text-secondary-foreground py-16 overflow-hidden backdrop-blur-md"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-6">
            {navItems.map((link, index) => (
              <Link 
                key={link.label}
                ref={(el) => { navLinksRef.current[index] = el; }}
                href={link.href}
                className="relative text-sm font-medium hover:text-primary transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center gap-4">
            {socialLinks.map((link, index) => (
              <Link 
                key={link.name}
                ref={(el) => { socialIconsRef.current[index] = el; }}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={link.name} 
                className="relative p-3 rounded-full bg-card/30 backdrop-blur-sm border border-border/50 text-secondary-foreground hover:text-primary hover:border-primary/50 transition-colors group"
              >
                <link.icon className="w-5 h-5" />
                <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-16 mb-12">
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl blur-2xl" />
            
            <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8 md:p-10 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-foreground mb-3">
                  Stay in the Loop
                </h3>
                <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                  Get notified when I publish new articles about software development, DevOps, and tech insights.
                </p>
              </div>
              
              <NewsletterSubscribe />
              
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div ref={copyrightRef} className="text-center mt-12 pt-8 border-t border-border/30">
          <p className="text-sm font-medium mb-2">
            &copy; {currentYear} Sebastian Alvarez. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            Built with <span className="text-primary">❤️</span> using Next.js, GSAP & Tailwind CSS
          </p>
          <p className="text-xs text-muted-foreground mt-2 flex flex-wrap items-center justify-center gap-3">
            <CookieSettingsLink />
            <span>•</span>
            <Link href="/privacy" className="hover:text-primary transition-colors underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary transition-colors underline">
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
