/**
 * Performance utility functions
 */

/**
 * Throttle function for scroll events
 */
export function throttle<A extends unknown[]>(
  func: (...args: A) => void,
  limit: number
): (...args: A) => void {
  let inThrottle: boolean;
  return function(this: unknown, ...args: A) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Debounce function for resize events
 */
export function debounce<A extends unknown[]>(
  func: (...args: A) => void,
  wait: number
): (...args: A) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(this: unknown, ...args: A) {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Request animation frame wrapper for smooth updates
 */
export function rafThrottle<A extends unknown[]>(
  callback: (...args: A) => void
): (...args: A) => void {
  let rafId: number | null = null;
  
  return function(this: unknown, ...args: A) {
    if (rafId !== null) return;
    
    rafId = requestAnimationFrame(() => {
      callback.apply(this, args);
      rafId = null;
    });
  };
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: Element, offset = 0): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

/**
 * Lazy load images when in viewport
 */
export function lazyLoadImage(img: HTMLImageElement, src: string) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    observer.observe(img);
    return () => observer.disconnect();
  } else {
    img.src = src;
    return () => {};
  }
}
