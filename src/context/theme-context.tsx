'use client';

import { createContext, useContext, useMemo, useCallback, useSyncExternalStore } from 'react';
import { getCookieConsent, setCookie } from '@/lib/cookies';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

// The <html> class is the source of truth: the pre-paint script in the root layout restores it
// from the cookie/localStorage before React runs, so there is no flash and nothing to sync on mount.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
const getServerSnapshot = (): Theme => 'light';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const newTheme: Theme = getSnapshot() === 'light' ? 'dark' : 'light';
    if (getCookieConsent()?.preferences ?? false) {
      setCookie('theme', newTheme);
    } else {
      localStorage.setItem('theme', newTheme);
    }
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
