'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('blog');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const extractIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 200;

    const extractHeadings = () => {
      const proseContainer = document.querySelector('.prose');
      
      if (!proseContainer) {
        if (attempts < maxAttempts) {
          attempts++;
          extractIntervalRef.current = setTimeout(extractHeadings, 20);
        }
        return;
      }
      
      const headingElements = proseContainer.querySelectorAll('h2, h3');
      
      if (headingElements.length === 0) {
        if (attempts < maxAttempts) {
          attempts++;
          extractIntervalRef.current = setTimeout(extractHeadings, 20);
        }
        return;
      }

      const extractedHeadings: Heading[] = [];
      
      headingElements.forEach((heading) => {
        const text = heading.textContent || '';
        const level = parseInt(heading.tagName.substring(1));
        let id = heading.id;
        
        // Si no tiene ID, generarlo temporalmente
        if (!id && text) {
          id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        }
        
        if (id && text) {
          extractedHeadings.push({ id, text, level });
        }
      });
      
      if (extractedHeadings.length > 0) {
        setHeadings(extractedHeadings);
        if (extractIntervalRef.current) {
          clearTimeout(extractIntervalRef.current);
        }
      } else if (attempts < maxAttempts) {
        attempts++;
        extractIntervalRef.current = setTimeout(extractHeadings, 20);
      }
    };

    // Resetear headings y extraer después de un pequeño delay
    setHeadings([]);
    const initialTimeout = setTimeout(() => extractHeadings(), 100);

    const proseContainer = document.querySelector('.prose');
    let observer: MutationObserver | null = null;
    
    if (proseContainer) {
      observer = new MutationObserver(() => {
        attempts = 0;
        extractHeadings();
      });

      observer.observe(proseContainer, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(initialTimeout);
      if (observer) {
        observer.disconnect();
      }
      if (extractIntervalRef.current) {
        clearTimeout(extractIntervalRef.current);
      }
    };
  }, [content]);


  const handleHeadingClick = (id: string, text: string) => {
    const proseContainer = document.querySelector('.prose');
    if (!proseContainer) return;
    
    let element = document.getElementById(id);
    
    if (!element) {
      const allHeadings = proseContainer.querySelectorAll('h2, h3');
      element = Array.from(allHeadings).find((h: any) => h.textContent === text) as HTMLElement;
    }
    
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
    <nav className="space-y-3">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
          <List className="h-4 w-4" />
          <span>{t('tableOfContents')}</span>
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
                onClick={() => handleHeadingClick(heading.id, heading.text)}
                className={cn(
                  'block w-full text-left py-1 px-4 -ml-[2px] border-l-2 transition-all duration-200',
                  'text-muted-foreground border-transparent hover:text-primary hover:border-primary cursor-pointer'
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
