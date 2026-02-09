import { useEffect, useRef } from 'react';

export function useGsapLazy(callback: (gsap: any) => void) {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const loadGsap = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        if (typeof window !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);
        }
        
        callback(gsap);
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadGsap(), { timeout: 2000 });
    } else {
      setTimeout(loadGsap, 100);
    }
  }, [callback]);
}
