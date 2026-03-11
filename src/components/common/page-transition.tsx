'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export function PageTransition() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }

    const isNavigatingToWhy = pathname === '/why' && prevPathnameRef.current !== '/why';
    
    if (isNavigatingToWhy) {
      createGreenRippleEffect();
    }

    prevPathnameRef.current = pathname;
  }, [pathname]);

  const createGreenRippleEffect = () => {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
    `;
    document.body.appendChild(flash);

    gsap.timeline({
      onComplete: () => {
        document.body.removeChild(flash);
      }
    })
    .to(flash, {
      opacity: 0.3,
      duration: 0.15,
      ease: 'power2.out',
    })
    .to(flash, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    });
  };

  return null;
}
