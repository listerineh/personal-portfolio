'use client';

import { useEffect, useRef } from 'react';
import { useSitePathname } from '@/hooks/use-site-pathname';

export function ScrollRestoration() {
  const pathname = useSitePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const hash = window.location.hash;
    
    // If navigating to homepage with hash, let useHashScroll handle it
    if (pathname === '/' && hash) {
      prevPathnameRef.current = pathname;
      return;
    }
    
    // For all other navigations (including homepage without hash), reset scroll
    if (prevPathnameRef.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  return null;
}
