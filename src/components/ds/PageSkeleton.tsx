import { cn } from "@/lib/utils";

/**
 * Loading placeholder shaped like an inner page: PageHeader's title and intro, then a row of panels. Shown while the
 * next page renders on the server; it fades in after a beat, so fast navigations never flash it.
 */
export function PageSkeleton({ label }: { label: string }) {
  return (
    <div data-loading-skeleton="" role="status" className="page-skeleton">
      <span className="sr-only">{label}</span>
      <div
        aria-hidden="true"
        className="px-gutter pb-12 pt-[calc(var(--header-h)+3.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+6rem)]"
      >
        <div className="mx-auto max-w-[1200px] motion-safe:animate-pulse">
          <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="grid gap-4 lg:col-span-7">
              <div className="h-11 w-3/4 rounded-full bg-foreground/[0.08] md:h-16" />
              <div className="h-11 w-1/2 rounded-full bg-foreground/[0.06] md:h-16" />
            </div>
            <div className="mt-6 grid gap-3 lg:col-span-5 lg:mt-0 lg:pb-3">
              <div className="h-4 w-full rounded-full bg-foreground/[0.06]" />
              <div className="h-4 w-4/5 rounded-full bg-foreground/[0.06]" />
            </div>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((n) => (
              <div
                key={n}
                className={cn("panel aspect-[4/3]", n > 0 && "hidden md:block")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
