interface EndOfListProps {
  children: React.ReactNode;
}

/** End of a room: a short rule and the closing catalog line, left-aligned like a wall label. */
export function EndOfList({ children }: EndOfListProps) {
  return (
    <div className="mt-16 flex items-center gap-4">
      <span aria-hidden="true" className="h-px w-12 bg-foreground/40" />
      <p className="text-catalog text-muted-foreground">{children}</p>
    </div>
  );
}
