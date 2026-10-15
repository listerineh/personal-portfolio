import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ExhibitProps {
  id: string
  /** The exhibition's identity color (hex); used only as its marker square. */
  color: string
  /** Catalog tags shown with the title (format, status). */
  tags?: ReactNode
  title: ReactNode
  /** One catalog line under the title (genre, years). */
  subtitle?: ReactNode
  tone?: 'paint' | 'plaster'
  className?: string
  children: ReactNode
}

/** A temporary exhibition inside the site: its own marker color, the house type and grid. */
export function Exhibit({ id, color, tags, title, subtitle, tone = 'plaster', className, children }: ExhibitProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(tone === 'paint' ? 'wall' : 'bg-background text-foreground', 'border-t border-foreground/20 px-gutter py-20 md:py-28', className)}
    >
      <div className="mx-auto max-w-[1296px]">
        <div className="flex flex-wrap items-center gap-3">
          <span aria-hidden="true" className="h-4 w-4 shrink-0" style={{ backgroundColor: color }} />
          {tags}
        </div>
        <h2 id={`${id}-title`} className="text-display mt-6">
          {title}
        </h2>
        {subtitle && <p className="text-catalog mt-3 text-muted-foreground">{subtitle}</p>}
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}
