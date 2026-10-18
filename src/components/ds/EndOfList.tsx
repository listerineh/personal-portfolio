interface EndOfListProps {
  children: React.ReactNode;
}

/** End of a room: a short rule and the closing catalog line, left-aligned like a wall label. */
export function EndOfList({ children }: EndOfListProps) {
  return (
    <div className="mt-16 flex items-center gap-4">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
      <p className="text-meta text-muted-foreground">{children}</p>
    </div>
  );
}
