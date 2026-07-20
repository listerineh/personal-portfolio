'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransition() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}
