'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Button } from '@/components/ui/button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function BackToTopButton() {
  const pathname = usePathname();
  const isOnMusicPage = pathname === '/why';
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasReachedTop, setHasReachedTop] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY < 100 && isAnimating) {
        setHasReachedTop(true);
        setIsAnimating(false);
      }
      
      if (!isAnimating && hasReachedTop && scrollY > 800) {
        setIsVisible(true);
        setHasReachedTop(false);
      } else if (!isAnimating && !hasReachedTop && scrollY > 800) {
        setIsVisible(true);
      } else if (scrollY <= 800 && !isAnimating) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAnimating, hasReachedTop]);

  useEffect(() => {
    if (!buttonRef.current || isAnimating) return;

    if (isVisible) {
      gsap.to(buttonRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(buttonRef.current, {
        scale: 0,
        opacity: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isVisible, isAnimating]);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const icon = button.querySelector('svg');

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(icon, {
        y: -3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(icon, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToTop = () => {
    if (!buttonRef.current || isAnimating) return;

    setIsVisible(false);
    setIsAnimating(true);
    setHasReachedTop(false);

    gsap.to(buttonRef.current, {
      y: -100,
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        if (buttonRef.current) {
          gsap.set(buttonRef.current, { y: 0 });
        }
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      ref={buttonRef}
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 h-12 w-12 rounded-full shadow-lg p-0 opacity-0 scale-0 transition-all duration-300 font-bold ${
        isOnMusicPage
          ? 'bg-[#1DB954] hover:bg-[#1ed760] text-black dark:bg-[#1DB954] dark:hover:bg-[#1ed760] dark:text-black'
          : 'bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
