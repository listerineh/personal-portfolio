'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Music } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navItems, socialLinks } from '@/lib/data';
import { CookieSettingsLink } from '@/components/common/cookie-settings-link';
import { NewsletterSubscribe } from '@/components/blog/newsletter-subscribe';
import { Button } from '@/components/ui/button';

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
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power2.out',
        }
      )
      .fromTo(socialIcons,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.06,
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.2')
      .fromTo(copyrightRef.current,
        { y: 15, opacity: 0 },
        {
          y: 0,
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
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-t from-secondary/60 via-secondary/40 to-secondary/20 text-secondary-foreground py-16 overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <nav aria-label="Footer navigation" className="flex flex-col items-center gap-4">
            <ul className="flex flex-wrap justify-center gap-6">
              {navItems.map((link, index) => (
                <li key={link.label}>
                  <Link 
                    ref={(el) => { navLinksRef.current[index] = el; }}
                    href={link.href}
                    className="relative text-sm font-medium hover:text-primary transition-colors group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex justify-center gap-4" aria-label="Social media links">
            {socialLinks.map((link, index) => (
              <Link 
                key={link.name}
                ref={(el) => { socialIconsRef.current[index] = el; }}
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
        
        <div className="mt-24 mb-20">
          <div className="max-w-5xl mx-auto relative px-4 sm:px-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-[100px] opacity-20" />
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-3xl border border-border/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
                
                <div className="absolute inset-0 opacity-[0.02]" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
                
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-6 sm:p-8 md:p-16">
                  <div className="flex flex-col justify-center space-y-4 md:space-y-6">
                    <div className="space-y-3 md:space-y-4">
                      <div className="inline-flex">
                        <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
                          Newsletter
                        </span>
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">
                        Stay ahead of
                        <br />
                        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                          the curve
                        </span>
                      </h3>
                      
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Join developers who receive curated insights on modern software engineering, cloud infrastructure, and cutting-edge tech.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2 md:pt-4">
                      <div className="space-y-1">
                        <div className="text-xl sm:text-2xl font-bold text-foreground">Monthly</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Updates</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xl sm:text-2xl font-bold text-foreground">0%</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Spam</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xl sm:text-2xl font-bold text-foreground">Free</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Forever</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-full">
                      <NewsletterSubscribe />
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-tl-2xl sm:rounded-tl-[2rem]" />
                <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-br-2xl sm:rounded-br-[2rem]" />
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
            <span>•</span>
            <Link href="/listerineh" className="hover:text-[#1DB954] transition-colors underline">
              Why Listerineh?
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
