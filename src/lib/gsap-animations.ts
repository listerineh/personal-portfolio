import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ autoSleep: 60 });
}

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  
  const cores = (navigator as any).hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 8;
  const connection = (navigator as any).connection;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  const hasSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g');
  const hasLowMemory = memory <= 4;
  const hasLowCores = cores <= 4;
  
  return hasLowMemory || hasLowCores || hasSlowConnection || (isMobile && (hasLowMemory || hasLowCores));
};

const getDuration = (baseDuration: number) => {
  if (prefersReducedMotion()) return 0;
  if (isLowEndDevice()) return baseDuration * 0.5;
  return baseDuration;
};

export const fadeInUp = (element: string | Element, delay: number = 0) => {
  if (prefersReducedMotion()) return;
  
  return gsap.from(element, {
    y: isLowEndDevice() ? 15 : 30,
    opacity: 0,
    duration: getDuration(0.5),
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
};

export const fadeInScale = (element: string | Element, delay: number = 0) => {
  if (prefersReducedMotion() || isLowEndDevice()) {
    return gsap.from(element, {
      opacity: 0,
      duration: getDuration(0.4),
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }
  
  return gsap.from(element, {
    scale: 0.95,
    opacity: 0,
    duration: getDuration(0.5),
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
};

export const slideInFromLeft = (element: string | Element, delay: number = 0) => {
  if (prefersReducedMotion() || isLowEndDevice()) {
    return gsap.from(element, {
      opacity: 0,
      duration: getDuration(0.4),
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }
  
  return gsap.from(element, {
    x: -30,
    opacity: 0,
    duration: getDuration(0.5),
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
};

export const slideInFromRight = (element: string | Element, delay: number = 0) => {
  if (prefersReducedMotion() || isLowEndDevice()) {
    return gsap.from(element, {
      opacity: 0,
      duration: getDuration(0.4),
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }
  
  return gsap.from(element, {
    x: 30,
    opacity: 0,
    duration: getDuration(0.5),
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
};

export const staggerFadeIn = (elements: string, delay: number = 0) => {
  if (prefersReducedMotion()) return;
  
  return gsap.from(elements, {
    opacity: 0,
    duration: getDuration(0.4),
    stagger: isLowEndDevice() ? 0.03 : 0.05,
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: elements,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
};

export const parallaxEffect = (element: string | Element, speed: number = 0.5) => {
  if (prefersReducedMotion() || isLowEndDevice()) return;
  
  return gsap.to(element, {
    y: () => window.innerHeight * speed * 0.5,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    },
  });
};

export const rotateIn = (element: string | Element, delay: number = 0) => {
  if (prefersReducedMotion() || isLowEndDevice()) {
    return gsap.from(element, {
      opacity: 0,
      duration: getDuration(0.4),
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }
  
  return gsap.from(element, {
    rotation: -45,
    opacity: 0,
    duration: getDuration(0.5),
    delay,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
};

export const scaleOnHover = (element: string | Element) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouchDevice || isLowEndDevice()) return;

  el.addEventListener('mouseenter', () => {
    gsap.to(el, {
      scale: 1.02,
      duration: getDuration(0.2),
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      scale: 1,
      duration: getDuration(0.15),
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });
};

export const revealText = (element: string | Element, delay: number = 0) => {
  if (prefersReducedMotion() || isLowEndDevice()) {
    return gsap.from(element, {
      opacity: 0,
      duration: getDuration(0.3),
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }
  
  return gsap.from(element, {
    opacity: 0,
    y: 10,
    duration: getDuration(0.4),
    delay,
    ease: 'power2.out',
    stagger: {
      each: 0.015,
      from: 'start',
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
};

export const magneticEffect = (element: string | Element, strength: number = 0.3) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouchDevice || isLowEndDevice()) return;

  el.addEventListener('mousemove', (e: Event) => {
    const mouseEvent = e as MouseEvent;
    const rect = (el as HTMLElement).getBoundingClientRect();
    const x = mouseEvent.clientX - rect.left - rect.width / 2;
    const y = mouseEvent.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * strength * 0.5,
      y: y * strength * 0.5,
      duration: getDuration(0.15),
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: getDuration(0.2),
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });
};
