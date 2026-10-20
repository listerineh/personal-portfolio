import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PagerLink {
  href: string
  title: string
}

interface PostPagerProps {
  /** Published before this one. */
  previous?: PagerLink
  /** Published after this one. */
  next?: PagerLink
  labels: { previous: string; next: string; nav: string }
  className?: string
}

/**
 * The way to the neighbouring posts at the end of an article: two panels, older on the left, newer on the right
 * (stacked on phones). A missing side leaves its column empty so the other keeps its place.
 */
export function PostPager({ previous, next, labels, className }: PostPagerProps) {
  if (!previous && !next) return null
  const item = (link: PagerLink, direction: 'previous' | 'next') => (
    <Link
      href={link.href}
      rel={direction === 'previous' ? 'prev' : 'next'}
      className={cn(
        'panel group flex min-h-[7.5rem] flex-col justify-between gap-4 p-5 transition-shadow duration-snap ease-snap hover:shadow-float md:p-6',
        direction === 'next' && 'sm:col-start-2 sm:items-end sm:text-right',
      )}
    >
      <span className="text-meta inline-flex items-center gap-1 text-muted-foreground">
        {direction === 'previous' && (
          <ChevronLeft aria-hidden="true" className="h-4 w-4 transition-transform duration-snap ease-snap group-hover:-translate-x-0.5 motion-reduce:transition-none" />
        )}
        {labels[direction]}
        {direction === 'next' && (
          <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform duration-snap ease-snap group-hover:translate-x-0.5 motion-reduce:transition-none" />
        )}
      </span>
      <span className="text-headline line-clamp-2 text-foreground">{link.title}</span>
    </Link>
  )
  return (
    <nav aria-label={labels.nav} className={cn('grid gap-4 sm:grid-cols-2', className)}>
      {previous && item(previous, 'previous')}
      {next && item(next, 'next')}
    </nav>
  )
}
