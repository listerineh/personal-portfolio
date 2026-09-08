'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Accent } from './types';

const accentRingMap: Record<Accent, string> = {
  amber: 'focus:ring-primary/20 focus:border-primary',
  indigo: 'focus:ring-indigo-400/20 focus:border-indigo-400',
  green: 'focus:ring-green-500/20 focus:border-green-500',
  neutral: 'focus:ring-foreground/10 focus:border-foreground/40',
};

const accentRingErrorMap: Record<Accent, string> = {
  amber: 'ring-destructive/30 border-destructive',
  indigo: 'ring-destructive/30 border-destructive',
  green: 'ring-destructive/30 border-destructive',
  neutral: 'ring-destructive/30 border-destructive',
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  accent?: Accent;
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ accent = 'indigo', error = false, className = '', ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-[border-color,background-color,box-shadow,color] duration-200 ease-out',
          'bg-foreground/[0.04] text-foreground/85 placeholder:text-foreground/30 resize-none',
          'border border-foreground/[0.15]',
          error ? accentRingErrorMap[accent] : `focus:ring-2 ${accentRingMap[accent]}`,
          className
        )}
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
