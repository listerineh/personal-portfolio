'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { rafThrottle } from '@/lib/performance-utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasReachedTop, setHasReachedTop] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reducedMotionRef = useRef(false);

  const handleScroll = useCallback(rafThrottle(() => {
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
  }), [isAnimating, hasReachedTop]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!buttonRef.current || isAnimating) return;

    if (reducedMotionRef.current) {
      gsap.set(buttonRef.current, { scale: isVisible ? 1 : 0.9, opacity: isVisible ? 1 : 0, y: 0 });
      return;
    }

    if (isVisible) {
      gsap.to(buttonRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      });
    } else {
      gsap.to(buttonRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  }, [isVisible, isAnimating]);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const icon = button.querySelector('svg');
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouchDevice || reducedMotionRef.current) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.08,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to(icon, {
        y: -2,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to(icon, {
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
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

    if (!reducedMotionRef.current) {
      gsap.to(buttonRef.current, {
        y: -100,
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          if (buttonRef.current) {
            gsap.set(buttonRef.current, { y: 0 });
          }
        }
      });
    }

    window.scrollTo({
      top: 0,
      behavior: reducedMotionRef.current ? 'instant' : 'smooth',
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-40 h-11 w-11 rounded-full shadow-xl flex items-center justify-center opacity-0 scale-90 font-bold border-0 bg-primary text-primary-foreground transition-transform duration-200 ease-out active:scale-[0.95]"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
