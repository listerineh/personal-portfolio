/**
 * Performance detection and optimization utilities
 * Detects device capabilities and adjusts animations accordingly
 */

export type DevicePerformance = 'high' | 'medium' | 'low';

export interface PerformanceConfig {
  enableAnimations: boolean;
  enableComplexAnimations: boolean;
  enableParallax: boolean;
  enableBlur: boolean;
  reducedMotion: boolean;
  animationDuration: number;
  animationDelay: number;
}

/**
 * Detect device performance level based on various factors
 */
export function detectDevicePerformance(): DevicePerformance {
  if (typeof window === 'undefined') return 'medium';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return 'low';

  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory < 4) return 'low';
  if (deviceMemory && deviceMemory >= 8) return 'high';

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;
  if (cores < 4) return 'low';
  if (cores >= 8) return 'high';

  // Check if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check if touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Mobile devices get medium or low performance
  if (isMobile || isTouchDevice) {
    // Check if it's a high-end mobile (iPad Pro, high-end Android)
    const isHighEndMobile = cores >= 6 && (deviceMemory ? deviceMemory >= 4 : true);
    return isHighEndMobile ? 'medium' : 'low';
  }

  // Check connection speed (if available)
  const connection = (navigator as any).connection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === 'slow-2g' || effectiveType === '2g') return 'low';
    if (effectiveType === '4g') return 'high';
  }

  // Default to medium for desktop
  return 'medium';
}

/**
 * Get performance configuration based on device capabilities
 */
export function getPerformanceConfig(performance?: DevicePerformance): PerformanceConfig {
  const detectedPerformance = performance || detectDevicePerformance();
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  switch (detectedPerformance) {
    case 'high':
      return {
        enableAnimations: !prefersReducedMotion,
        enableComplexAnimations: !prefersReducedMotion,
        enableParallax: !prefersReducedMotion,
        enableBlur: true,
        reducedMotion: prefersReducedMotion,
        animationDuration: 1,
        animationDelay: 1,
      };

    case 'medium':
      return {
        enableAnimations: !prefersReducedMotion,
        enableComplexAnimations: false,
        enableParallax: false,
        enableBlur: true,
        reducedMotion: prefersReducedMotion,
        animationDuration: 0.8,
        animationDelay: 0.8,
      };

    case 'low':
      return {
        enableAnimations: false,
        enableComplexAnimations: false,
        enableParallax: false,
        enableBlur: false,
        reducedMotion: true,
        animationDuration: 0.3,
        animationDelay: 0.3,
      };
  }
}

/**
 * Check if device supports smooth animations
 */
export function supportsAnimations(): boolean {
  if (typeof window === 'undefined') return false;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return false;

  const performance = detectDevicePerformance();
  return performance !== 'low';
}

/**
 * Get optimized GSAP animation config based on performance
 */
export function getGSAPConfig(performance?: DevicePerformance) {
  const config = getPerformanceConfig(performance);
  
  return {
    duration: config.animationDuration * 0.5, // Base duration multiplier
    ease: config.enableComplexAnimations ? 'power2.out' : 'linear',
    force3D: config.enableComplexAnimations,
    lazy: !config.enableComplexAnimations,
  };
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Request idle callback with fallback
 */
export function requestIdleCallback(callback: () => void, timeout = 1000) {
  if (typeof window === 'undefined') return;
  
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 1);
  }
}
