import type React from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  isInfinite?: boolean;
  badge?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  id, 
  title, 
  children, 
  className = '', 
  titleClassName = '',
  contentClassName = '',
  isInfinite = false,
  badge = 'Featured',
}) => {
  return (
    <section id={id} className={cn('py-20 md:py-32 animate-fade-in', className)}>
      <div className={cn(isInfinite ? '' : 'container mx-auto px-4')}>
        <div className="text-center mb-16 md:mb-20">
          {badge && (
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">{badge}</span>
          )}
          <h2 className={cn(
            "text-4xl md:text-5xl font-headline font-bold text-foreground",
            titleClassName
          )}>
            {title}
          </h2>
        </div>
        <div className={cn(contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
};
