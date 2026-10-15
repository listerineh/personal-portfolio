'use client';

import { Sun, Moon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/context/theme-context';
import { prefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ThemeToggleButtonProps {
  className?: string;
}

type DocumentWithTransitions = Document & { startViewTransition?: (update: () => void) => unknown };

/** Lights on / lights off. Cross-fades with the View Transitions API where available. */
export function ThemeToggleButton({ className }: ThemeToggleButtonProps) {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('theme');
  const nextLabel = theme === 'dark' ? t('lightMode') : t('darkMode');

  const handleClick = () => {
    const doc = document as DocumentWithTransitions;
    if (doc.startViewTransition && !prefersReducedMotion()) {
      doc.startViewTransition(toggleTheme);
    } else {
      toggleTheme();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${t('toggleTheme')}: ${nextLabel}`}
      title={nextLabel}
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors duration-snap ease-snap hover:text-foreground',
        className,
      )}
    >
      {theme === 'dark' ? <Sun aria-hidden="true" className="h-5 w-5" /> : <Moon aria-hidden="true" className="h-5 w-5" />}
    </button>
  );
}
