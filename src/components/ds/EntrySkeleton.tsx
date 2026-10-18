/** Loading placeholder shaped like a post card: cover, meta line, title, two lines of excerpt. */
export function EntrySkeleton() {
  return (
    <div aria-hidden="true" className="panel overflow-hidden motion-safe:animate-pulse">
      <div className="aspect-[16/10] bg-foreground/[0.07]" />
      <div className="grid gap-3 p-6">
        <div className="h-3 w-1/3 rounded-full bg-foreground/10" />
        <div className="h-5 w-4/5 rounded-full bg-foreground/[0.12]" />
        <div className="h-4 w-full rounded-full bg-foreground/[0.07]" />
        <div className="h-4 w-2/3 rounded-full bg-foreground/[0.07]" />
      </div>
    </div>
  );
}
