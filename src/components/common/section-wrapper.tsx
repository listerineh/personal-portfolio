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
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  id, 
  title, 
  children, 
  className = '', 
  titleClassName = '',
  contentClassName = '',
  isInfinite = false,
}) => {
  return (
    <section id={id} className={cn('py-16 md:py-24 animate-fade-in', className)}>
      <div className={cn(isInfinite ? '' : 'container mx-auto px-4')}>
        <h2 className={cn(
          "text-3xl md:text-4xl font-headline font-bold mb-12 md:mb-16 text-center text-primary",
          titleClassName
        )}>
          {title}
        </h2>
        <div className={cn(contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
};
