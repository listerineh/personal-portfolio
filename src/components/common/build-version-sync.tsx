'use client';

import { useEffect } from 'react';

export function BuildVersionSync() {
  useEffect(() => {
    const syncBuildVersion = async () => {
      try {
        const response = await fetch('/build-id.txt', { cache: 'no-store' });
        const buildId = (await response.text()).trim();
        localStorage.setItem('app-build-id', buildId);
      } catch (error) {
        console.warn('Failed to sync build version:', error);
      }
    };

    syncBuildVersion();
  }, []);

  return null;
}
