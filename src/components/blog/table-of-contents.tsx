'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const headingElements = tempDiv.querySelectorAll('h2, h3');
    const extractedHeadings: Heading[] = [];
    
    headingElements.forEach((heading, index) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1));
      const id = heading.id || `heading-${index}`;
      
      if (!heading.id) {
        heading.id = id;
      }
      
      extractedHeadings.push({ id, text, level });
    });
    
    setHeadings(extractedHeadings);
    
    const contentContainer = document.querySelector('.prose');
    if (contentContainer) {
      contentContainer.innerHTML = tempDiv.innerHTML;
    }
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1.0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
          <List className="h-4 w-4" />
          <span>Table of Contents</span>
        </div>
        
        <ul className="space-y-2 text-sm border-l-2 border-border/50">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                'transition-all duration-200',
                heading.level === 3 && 'ml-4'
              )}
            >
              <button
                onClick={() => handleClick(heading.id)}
                className={cn(
                  'block w-full text-left py-1 px-4 -ml-[2px] border-l-2 transition-all duration-200',
                  'hover:text-primary hover:border-primary',
                  activeId === heading.id
                    ? 'text-primary border-primary font-medium'
                    : 'text-muted-foreground border-transparent'
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
