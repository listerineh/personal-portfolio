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
        
        <div className="mt-24 mb-20">
          <div className="max-w-5xl mx-auto relative">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-[100px] opacity-20" />
            
            <div className="relative">
              {/* Main card with bento-style design */}
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-3xl border border-border/30">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
                
                <div className="relative grid md:grid-cols-2 gap-12 p-10 md:p-16">
                  {/* Left column - Content */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div className="space-y-4">
                      <div className="inline-flex">
                        <span className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
                          Newsletter
                        </span>
                      </div>
                      
                      <h3 className="text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">
                        Stay ahead of
                        <br />
                        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                          the curve
                        </span>
                      </h3>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Join developers who receive curated insights on modern software engineering, cloud infrastructure, and cutting-edge tech.
                      </p>
                    </div>
                    
                    {/* Stats or benefits */}
                    <div className="grid grid-cols-3 gap-6 pt-4">
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-foreground">Weekly</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Updates</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-foreground">0%</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Spam</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-foreground">Free</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Forever</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column - Form */}
                  <div className="flex items-center">
                    <div className="w-full space-y-6">
                      <NewsletterSubscribe />
                      
                      <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground/60">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Secure
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Private
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          No spam
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle corner highlights */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-tl-[2rem]" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-br-[2rem]" />
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
