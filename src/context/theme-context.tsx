'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { getCookieConsent, setCookie, getCookie } from '@/lib/cookies';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const consent = getCookieConsent();
    const usePreferenceCookies = consent?.preferences ?? false;

    let savedTheme: Theme = 'light';

    if (usePreferenceCookies) {
      const cookieTheme = getCookie('theme') as Theme;
      savedTheme = cookieTheme || 'light';
    } else {
      savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    }

    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    const consent = getCookieConsent();
    const usePreferenceCookies = consent?.preferences ?? false;

    if (usePreferenceCookies) {
      setCookie('theme', newTheme);
    } else {
      localStorage.setItem('theme', newTheme);
    }

    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
