interface EndOfListProps {
  children: React.ReactNode;
}

export function EndOfList({ children }: EndOfListProps) {
  return (
    <div className="mt-16 w-full flex items-center gap-4">
      <div className="flex-1 h-px bg-foreground/[0.07]" />
      <span className="font-headline text-[10px] tracking-[0.3em] uppercase text-foreground/25">
        {children}
      </span>
      <div className="flex-1 h-px bg-foreground/[0.07]" />
    </div>
  );
}
