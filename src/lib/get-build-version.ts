'use client';

let cachedBuildId: string | null = null;

export function getBuildVersion(): string {
  if (cachedBuildId) {
    return cachedBuildId;
  }

  if (typeof window !== 'undefined') {
    try {
      cachedBuildId = localStorage.getItem('app-build-id') || new Date().getTime().toString();
      return cachedBuildId;
    } catch (error) {
      console.warn('Could not read build ID from localStorage');
    }
  }

  cachedBuildId = new Date().getTime().toString();
  return cachedBuildId;
}

export function getImageUrl(url: string): string {
  if (!url) return url;
  const buildVersion = getBuildVersion();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${buildVersion}`;
}
