import type React from 'react';
import { SectionLabel } from './SectionLabel';
import type { Accent, SectionAlign, TitleGradient } from './types';

interface SectionHeaderProps {
  label?: string;
  labelAccent?: Accent;
  title: string;
  titleGradient?: TitleGradient;
  description?: string;
  align?: SectionAlign;
  className?: string;
}

const gradientMap: Record<'amber' | 'indigo' | 'green', string> = {
  amber: 'linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b)',
  indigo: 'linear-gradient(90deg, #818cf8, #c7d2fe, #818cf8)',
  green: 'linear-gradient(90deg, #1DB954, #4ade80, #1DB954)',
};

export function SectionHeader({
  label,
  labelAccent = 'neutral',
  title,
  titleGradient = false,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center' : ''} ${className}`}>
      {label && (
        <SectionLabel
          accent={labelAccent}
          className={`mb-4 ${isCenter ? 'mx-auto' : ''}`}
        >
          {label}
        </SectionLabel>
      )}
      <h2
        className="font-headline font-bold leading-[0.95] text-foreground"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
      >
        {titleGradient ? (
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: gradientMap[titleGradient] }}
          >
            {title}
          </span>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          className={`mt-4 text-foreground/50 leading-relaxed ${isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}
          style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
