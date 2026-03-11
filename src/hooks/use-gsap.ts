'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supportsAnimations, getGSAPConfig } from '@/lib/performance';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Configure GSAP for better performance
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });
}

export function useGSAP(
  callback: (context: gsap.Context) => void,
  dependencies: any[] = [],
  options?: { skipPerformanceCheck?: boolean }
) {
  const contextRef = useRef<gsap.Context>();

  useEffect(() => {
    // Skip animations on low-performance devices unless explicitly disabled
    if (!options?.skipPerformanceCheck && !supportsAnimations()) {
      return;
    }

    contextRef.current = gsap.context(() => {
      callback(contextRef.current!);
    });

    return () => {
      contextRef.current?.revert();
    };
  }, dependencies);

  return contextRef;
}

export function useScrollTrigger(
  trigger: string | Element,
  animation: gsap.TweenVars,
  options?: ScrollTrigger.Vars & { skipPerformanceCheck?: boolean }
) {
  useEffect(() => {
    // Skip animations on low-performance devices unless explicitly disabled
    if (!options?.skipPerformanceCheck && !supportsAnimations()) {
      return;
    }

    const gsapConfig = getGSAPConfig();
    const baseDuration = typeof animation.duration === 'number' ? animation.duration : gsapConfig.duration;
    const tween = gsap.to(trigger, {
      ...animation,
      duration: baseDuration * gsapConfig.duration,
      ease: animation.ease || gsapConfig.ease,
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [trigger, animation, options]);
}
