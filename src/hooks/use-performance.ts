/**
 * Hook for performance-aware animations
 */

import { useState, useEffect } from 'react';
import { 
  detectDevicePerformance, 
  getPerformanceConfig, 
  getGSAPConfig,
  type DevicePerformance,
  type PerformanceConfig 
} from '@/lib/performance';

export function usePerformance() {
  const [performance, setPerformance] = useState<DevicePerformance>('medium');
  const [config, setConfig] = useState<PerformanceConfig>(() => getPerformanceConfig('medium'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const detectedPerformance = detectDevicePerformance();
    setPerformance(detectedPerformance);
    setConfig(getPerformanceConfig(detectedPerformance));

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      const newPerformance = detectDevicePerformance();
      setPerformance(newPerformance);
      setConfig(getPerformanceConfig(newPerformance));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    performance,
    config,
    mounted,
    gsapConfig: getGSAPConfig(performance),
    shouldAnimate: config.enableAnimations && mounted,
    shouldUseComplexAnimations: config.enableComplexAnimations && mounted,
  };
}
