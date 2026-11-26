import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Ambient } from './Ambient'

interface PageHeaderProps {
  title: ReactNode
  intro?: ReactNode
  /** Back link, breadcrumbs: rendered above the title as navigation. */
  nav?: ReactNode
  /** Controls under the intro (search, filters). */
  children?: ReactNode
  tone?: 'tint' | 'plain'
  /** `section` for long titles (articles). */
  titleSize?: 'display' | 'section'
  /** Ambient light behind the header (halos + grid + spotlight by default). */
  ambient?: boolean
  className?: string
}

/** The top of an inner page: a large title that comes into focus, one line on what is inside, then any controls. */
export function PageHeader({ title, intro, nav, children, tone = 'plain', titleSize = 'display', ambient = false, className }: PageHeaderProps) {
  // A display title never breaks inside a word: it shrinks until its longest word fits the column. The width of a
  // word is estimated at 0.64em per character (Geist bold, tight tracking, with room for wide letters like W and M).
  const longestWord = typeof title === 'string' ? Math.max(...title.split(/\s+/).map((word) => word.length)) : 0
  const fitWord = titleSize === 'display' && longestWord > 0 ? (longestWord * 0.64).toFixed(2) : null
  return (
    <header
      id="page-top"
      className={cn(
        tone === 'tint' ? 'tint' : 'bg-background text-foreground',
        'px-gutter pb-12 pt-[calc(var(--header-h)+3.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+6rem)]',
        ambient && 'relative isolate overflow-clip',
        className,
      )}
    >
      {/* The light fades out toward the bottom: the next section shares the ground, so no hard edge. */}
      {ambient && <Ambient className="[-webkit-mask-image:linear-gradient(to_bottom,#000_55%,transparent)] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]" />}
      <div className="mx-auto max-w-[1200px]">
        {nav && (
          <div data-intro="" className="mb-8">
            {nav}
          </div>
        )}
        {/* Desktop: title and intro share the row, so the header spans the whole column instead of hugging the left. */}
        <div className={cn(intro && titleSize === 'display' && 'lg:grid lg:grid-cols-12 lg:items-end lg:gap-10')}>
          <h1
            data-intro=""
            style={{ '--i': 0 } as React.CSSProperties}
            className={cn(
              titleSize === 'section' ? 'text-display-sm max-w-[24ch]' : 'text-display',
              intro && titleSize === 'display' && 'lg:col-span-7',
              fitWord && '[container-type:inline-size]',
            )}
          >
            {fitWord ? (
              <span className="block" style={{ fontSize: `min(1em, calc(100cqi / ${fitWord}))` }}>
                {title}
              </span>
            ) : (
              title
            )}
          </h1>
          {intro && (
            <div
              data-intro=""
              style={{ '--i': 1 } as React.CSSProperties}
              className={cn(
                'text-lead mt-5 max-w-[56ch] text-muted-foreground',
                titleSize === 'display' && 'lg:col-span-5 lg:mt-0 lg:pb-3',
              )}
            >
              {intro}
            </div>
          )}
        </div>
        {children && (
          <div data-intro="" style={{ '--i': 2 } as React.CSSProperties} className="mt-10 md:mt-14">
            {children}
          </div>
        )}
      </div>
    </header>
  )
}
