import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

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
  className?: string
}

/** The top of an inner page: a large title that comes into focus, one line on what is inside, then any controls. */
export function PageHeader({ title, intro, nav, children, tone = 'plain', titleSize = 'display', className }: PageHeaderProps) {
  return (
    <header
      id="page-top"
      className={cn(
        tone === 'tint' ? 'tint' : 'bg-background text-foreground',
        'px-gutter pb-12 pt-[calc(var(--header-h)+3.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+6rem)]',
        className,
      )}
    >
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
            className={cn(titleSize === 'section' ? 'text-display-sm max-w-[24ch]' : 'text-display', intro && titleSize === 'display' && 'lg:col-span-7')}
          >
            {title}
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
