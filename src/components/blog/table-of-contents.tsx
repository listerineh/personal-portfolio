'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /** Changes whenever the rendered article changes (slug + locale), so headings are re-read. */
  contentKey: string;
}

export function TableOfContents({ contentKey }: TableOfContentsProps) {
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

    // Headings are re-read after a short delay; the parent remounts this component per article.
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
  }, [contentKey]);


  const handleHeadingClick = (id: string, text: string) => {
    const proseContainer = document.querySelector('.prose');
    if (!proseContainer) return;
    
    let element = document.getElementById(id);
    
    if (!element) {
      const allHeadings = proseContainer.querySelectorAll('h2, h3');
      element = (Array.from(allHeadings).find((h) => h.textContent === text) as HTMLElement | undefined) ?? null;
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
    <nav aria-label={t('tableOfContents')}>
      <p className="text-meta text-muted-foreground">{t('tableOfContents')}</p>
      <ol className="mt-4 grid gap-0.5 border-l border-foreground/25">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 3 && 'pl-3')}>
            <a
              href={`#${heading.id}`}
              onClick={(event) => {
                event.preventDefault();
                handleHeadingClick(heading.id, heading.text);
              }}
              className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-muted-foreground transition-[color,border-color] duration-snap ease-snap hover:border-foreground hover:text-foreground"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
