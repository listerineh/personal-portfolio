/** Loading placeholder shaped like a written-work row: catalog line, title, excerpt, small print. */
export function EntrySkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-4 py-8 sm:grid-cols-[1fr_9rem] sm:gap-6 md:grid-cols-[1fr_11rem] motion-safe:animate-pulse">
      <div className="grid content-start gap-3">
        <div className="h-3 w-1/3 bg-foreground/10" />
        <div className="h-6 w-4/5 bg-foreground/[0.12]" />
        <div className="h-4 w-full bg-foreground/[0.07]" />
        <div className="h-4 w-2/3 bg-foreground/[0.07]" />
      </div>
      <div className="order-first aspect-[16/10] bg-foreground/[0.07] sm:order-none sm:aspect-[4/3]" />
    </div>
  )
}
