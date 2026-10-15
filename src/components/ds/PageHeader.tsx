import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  /** Room number when the page is a room on the route (same as on home). */
  number?: string
  /** Room name for the route and header. */
  name: string
  title: ReactNode
  intro?: ReactNode
  /** Back link, breadcrumbs: rendered above the title as navigation, not as an eyebrow. */
  nav?: ReactNode
  /** Controls hung on the wall under the intro (search, filters). */
  children?: ReactNode
  tone?: 'paint' | 'plaster'
  /** `room` for long titles (articles). */
  titleSize?: 'display' | 'room'
  className?: string
}

/** The wall you face when you enter a page: its title, its number, one line on what is inside. */
export function PageHeader({ number, name, title, intro, nav, children, tone = 'paint', titleSize = 'display', className }: PageHeaderProps) {
  return (
    <header
      data-room={number ?? '·'}
      data-room-name={name}
      id="page-top"
      className={cn(tone === 'paint' ? 'wall' : 'bg-background text-foreground', 'px-gutter pb-12 pt-24 md:pb-16 md:pt-32', className)}
    >
      <div className="mx-auto max-w-[1296px]">
        {nav && <div className="mb-8">{nav}</div>}
        <div className="grid grid-cols-[1fr_auto] items-end gap-x-6 gap-y-5 md:grid-cols-12">
          <h1 className={cn(titleSize === 'room' ? 'text-display-sm' : 'text-display', 'col-span-1 md:col-span-9')}>{title}</h1>
          {number && (
            <span
              aria-hidden="true"
              className="text-[clamp(2.5rem,10vw,6rem)] font-light leading-[0.8] tabular-nums text-muted-foreground [font-stretch:125%] md:col-span-3 md:justify-self-end"
            >
              {number}
            </span>
          )}
          {intro && <div className="text-lead col-span-2 max-w-[56ch] text-muted-foreground md:col-span-7">{intro}</div>}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  )
}
