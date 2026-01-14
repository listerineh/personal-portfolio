'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navItems, socialLinks } from '@/lib/data';

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

  // Animación de entrada on scroll - se ejecuta cada vez que cambia la ruta
  useEffect(() => {
    if (!footerRef.current) return;

    // Pequeño delay para asegurar que los refs estén listos
    const timer = setTimeout(() => {
      if (!footerRef.current) return;

      // Limpiar ScrollTriggers previos del footer
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
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [pathname]);

  // Efectos hover en iconos sociales
  useEffect(() => {
    // Detectar si es un dispositivo táctil
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

  // Hover simple en nav links
  useEffect(() => {
    // Detectar si es un dispositivo táctil
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
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Navigation Links */}
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
          
          {/* Social Icons */}
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
        
        {/* Copyright */}
        <div ref={copyrightRef} className="text-center mt-12 pt-8 border-t border-border/30">
          <p className="text-sm font-medium mb-2">
            &copy; {currentYear} Sebastian Alvarez. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            Built with <span className="text-primary">❤️</span> using Next.js, GSAP & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
