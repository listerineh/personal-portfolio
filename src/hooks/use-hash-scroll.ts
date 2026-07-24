'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useHashScroll() {
  const pathname = usePathname();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // Only run on homepage
    if (pathname !== '/') {
      hasScrolledRef.current = false;
      return;
    }

    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (!hash || hasScrolledRef.current) return;

    const sectionId = hash.substring(1);
    let attempts = 0;
    const maxAttempts = 20; // Try for up to 2 seconds

    const scrollToSection = () => {
      const section = document.getElementById(sectionId);
      
      if (section) {
        hasScrolledRef.current = true;
        requestAnimationFrame(() => {
          const headerOffset = 100;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'instant' });
        });
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(scrollToSection, 100);
      }
    };

    // Start trying to scroll
    scrollToSection();
  }, [pathname]);
}

// Helper function to scroll to section (can be used outside of React)
export function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth') {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerOffset = 100;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior
    });
    return true;
  }
  return false;
}
