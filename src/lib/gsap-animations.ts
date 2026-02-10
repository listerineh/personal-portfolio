import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Detect if device prefers reduced motion
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Detect low-end device (slow CPU/GPU)
const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  const cores = (navigator as any).hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 8;
  return cores <= 2 || memory <= 2;
};

// Get animation duration based on device performance
const getDuration = (baseDuration: number) => {
  if (prefersReducedMotion()) return 0;
  if (isLowEndDevice()) return baseDuration * 0.6;
  return baseDuration;
};

export const fadeInUp = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    y: 40,
    opacity: 0,
    duration: getDuration(0.6),
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

export const fadeInScale = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    scale: 0.9,
    opacity: 0,
    duration: getDuration(0.5),
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

export const slideInFromLeft = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    x: -60,
    opacity: 0,
    duration: getDuration(0.6),
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

export const slideInFromRight = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    x: 60,
    opacity: 0,
    duration: getDuration(0.6),
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

export const staggerFadeIn = (elements: string, delay: number = 0) => {
  return gsap.from(elements, {
    y: 30,
    opacity: 0,
    duration: getDuration(0.5),
    stagger: 0.08,
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: elements,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

export const parallaxEffect = (element: string | Element, speed: number = 0.5) => {
  if (prefersReducedMotion()) return;
  
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: isLowEndDevice() ? 0 : 1,
    },
  });
};

export const rotateIn = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    rotation: -90,
    opacity: 0,
    duration: getDuration(0.7),
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

export const scaleOnHover = (element: string | Element) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouchDevice) return;

  el.addEventListener('mouseenter', () => {
    gsap.to(el, {
      scale: 1.03,
      duration: getDuration(0.2),
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      scale: 1,
      duration: getDuration(0.2),
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });
};

export const revealText = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    opacity: 0,
    y: 15,
    duration: getDuration(0.4),
    delay,
    ease: 'power2.out',
    stagger: {
      each: 0.02,
      from: 'start',
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

export const magneticEffect = (element: string | Element, strength: number = 0.3) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouchDevice) return;

  el.addEventListener('mousemove', (e: Event) => {
    const mouseEvent = e as MouseEvent;
    const rect = (el as HTMLElement).getBoundingClientRect();
    const x = mouseEvent.clientX - rect.left - rect.width / 2;
    const y = mouseEvent.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: getDuration(0.2),
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: getDuration(0.3),
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });
};
