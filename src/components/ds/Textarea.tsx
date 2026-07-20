'use client';

import { forwardRef, useState } from 'react';
import { useTheme } from '@/context/theme-context';
import type { Accent } from './types';

const accentColorMap: Record<Accent, string> = {
  amber: '#f59e0b',
  indigo: '#818cf8',
  green: '#1DB954',
  neutral: '#a3a3a3',
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  accent?: Accent;
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ accent = 'indigo', error = false, style, className = '', ...props }, ref) => {
    const { theme } = useTheme();
    const [focused, setFocused] = useState(false);
    const dark = theme === 'dark';

    const accentColor = accentColorMap[accent];
    const borderColor = error
      ? '#f87171'
      : focused
      ? accentColor
      : dark
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(0,0,0,0.15)';

    return (
      <textarea
        ref={ref}
        className={`w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200 placeholder:text-foreground/30 resize-none ${className}`}
        style={{
          background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
          border: `1px solid ${borderColor}`,
          color: dark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.85)',
          boxShadow: focused && !error ? `0 0 0 3px ${accentColor}18` : 'none',
          ...style,
        }}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
