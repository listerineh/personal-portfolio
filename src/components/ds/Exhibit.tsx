import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ExhibitProps {
  id: string
  /** The project's identity color (hex); used for the marker dot and a faint glow behind the title. */
  color: string
  /** Catalog tags shown with the title (format, status). */
  tags?: ReactNode
  title: ReactNode
  /** One catalog line under the title (genre, years). */
  subtitle?: ReactNode
  tone?: 'tint' | 'plain'
  /** Decorative visual beside the title (e.g. a spinning Vinyl). */
  visual?: ReactNode
  className?: string
  children: ReactNode
}

/** One music project on /why: its identity color as a dot and soft glow, its tags, a large title, then its content. */
export function Exhibit({ id, color, tags, title, subtitle, tone = 'plain', visual, className, children }: ExhibitProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(tone === 'tint' ? 'tint' : 'bg-background text-foreground', 'relative isolate overflow-clip px-gutter py-24 md:py-32', className)}
    >
      {/* A faint wash of the project's color behind its title. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20vmax] -top-[20vmax] -z-10 h-[60vmax] w-[60vmax] rounded-full opacity-[0.22]"
        style={{ background: `radial-gradient(closest-side, ${color}, transparent)` }}
      />
      <div className="mx-auto max-w-[1200px]">
        <div className="group flex items-center justify-between gap-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: color }} />
              {tags}
            </div>
            <h2 id={`${id}-title`} className="text-display mt-6">
              {title}
            </h2>
            {subtitle && <p className="mt-3 text-[1.0625rem] font-medium text-muted-foreground">{subtitle}</p>}
          </div>
          {visual && <div className="hidden w-[clamp(140px,18vw,240px)] shrink-0 sm:block">{visual}</div>}
        </div>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  )
}
