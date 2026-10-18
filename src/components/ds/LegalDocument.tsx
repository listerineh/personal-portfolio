'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

export interface DocumentSection {
  id: string;
  title: string;
  children: ReactNode;
}

interface LegalDocumentProps {
  sections: DocumentSection[];
  /** Label of the index, e.g. "On this page". */
  tocLabel: string;
  className?: string;
}

/** Body paragraph at reading measure. */
export function DocText({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('max-w-[66ch] text-[1.0625rem] leading-[1.75] text-foreground/85', className)}>{children}</p>;
}

/** A list with soft amber markers instead of bullets. */
export function DocList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('grid max-w-[66ch] gap-3', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-relaxed text-foreground/85">
          <span aria-hidden="true" className="mt-[0.45em] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/[0.14]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A long document (privacy, terms) as numbered sections beside an index that stays in view and marks the section
 * being read. On phones the index folds into a collapsible "On this page" panel above the text.
 */
export function LegalDocument({ sections, tocLabel, className }: LegalDocumentProps) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const index = (onNavigate?: () => void) => (
    <ol className="grid gap-0.5">
      {sections.map(({ id, title }, i) => (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={onNavigate}
            aria-current={active === id ? 'location' : undefined}
            className={cn(
              'flex items-baseline gap-3 rounded-[12px] px-3 py-2 text-sm leading-snug',
              'transition-[background-color,color] duration-snap ease-snap motion-reduce:transition-none',
              active === id ? 'bg-foreground/[0.06] text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <span className={cn('w-5 shrink-0 tabular-nums text-xs font-semibold', active === id ? 'text-primary' : 'text-muted-foreground/70')}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className={cn('grid gap-10 lg:grid-cols-12 lg:gap-10', className)}>
      <aside className="lg:col-span-4 xl:col-span-3">
        <details className="panel group p-2 lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-3 text-sm font-semibold">
            {tocLabel}
            <ChevronDown aria-hidden="true" className="h-4 w-4 transition-transform duration-snap ease-snap group-open:rotate-180" />
          </summary>
          <div className="pb-1 pt-1">{index()}</div>
        </details>
        <nav aria-label={tocLabel} className="sticky top-[calc(var(--header-h)+1.5rem)] hidden lg:block">
          <p className="text-meta mb-3 px-3 text-muted-foreground">{tocLabel}</p>
          {index()}
        </nav>
      </aside>

      <div className="grid gap-16 md:gap-20 lg:col-span-8 lg:col-start-5 xl:col-span-8 xl:col-start-5">
        {sections.map(({ id, title, children }, i) => (
          <Reveal key={id}>
            <section id={id} aria-labelledby={`${id}-title`} className="grid scroll-mt-[calc(var(--header-h)+1.5rem)] gap-5">
              <p aria-hidden="true" className="text-sm font-semibold tabular-nums text-primary">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 id={`${id}-title`} className="text-subhead -mt-2">
                {title}
              </h2>
              {children}
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
