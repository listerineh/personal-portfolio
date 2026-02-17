import { useEffect } from 'react';

export function useCacheBuster() {
  useEffect(() => {
    const checkBuildId = async () => {
      try {
        const response = await fetch('/build-id.txt', { cache: 'no-store' });
        const currentBuildId = await response.text();
        const storedBuildId = localStorage.getItem('app-build-id');

        if (storedBuildId && storedBuildId !== currentBuildId) {
          localStorage.setItem('app-build-id', currentBuildId);
          window.location.reload();
        } else if (!storedBuildId) {
          localStorage.setItem('app-build-id', currentBuildId);
        }
      } catch (error) {
        console.error('Failed to check build ID:', error);
      }
    };

    checkBuildId();
  }, []);
}
