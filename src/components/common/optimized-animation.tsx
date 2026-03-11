/**
 * Optimized Animation Wrapper
 * Automatically adjusts animations based on device performance
 */

'use client';

import { ReactNode } from 'react';
import { usePerformance } from '@/hooks/use-performance';

interface OptimizedAnimationProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export function OptimizedAnimation({ 
  children, 
  fallback, 
  className 
}: OptimizedAnimationProps) {
  const { shouldAnimate, config } = usePerformance();

  if (!shouldAnimate && fallback) {
    return <div className={className}>{fallback}</div>;
  }

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={className}
      style={{
        willChange: config.enableComplexAnimations ? 'transform, opacity' : 'auto',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Performance-aware blur wrapper
 */
export function OptimizedBlur({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  const { config } = usePerformance();

  return (
    <div className={config.enableBlur ? `${className} backdrop-blur-sm` : className}>
      {children}
    </div>
  );
}
