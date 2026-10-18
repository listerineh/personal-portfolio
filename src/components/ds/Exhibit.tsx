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
  tone?: 'tint' | 'plain'
  className?: string
  children: ReactNode
}

/** A temporary exhibition inside the site: its own marker color, the house type and grid. */
export function Exhibit({ id, color, tags, title, subtitle, tone = 'plain', className, children }: ExhibitProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(tone === 'tint' ? 'tint' : 'bg-background text-foreground', 'px-gutter py-20 md:py-28', className)}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-center gap-3">
          <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: color }} />
          {tags}
        </div>
        <h2 id={`${id}-title`} className="text-display mt-6">
          {title}
        </h2>
        {subtitle && <p className="text-meta mt-3 text-muted-foreground">{subtitle}</p>}
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}
