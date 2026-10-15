interface SkipLinkProps {
  href?: string;
  children: React.ReactNode;
}

/** First focusable element on every page: jumps past the header to the main content. */
export function SkipLink({ href = '#main-content', children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:left-gutter focus:top-2 focus:z-[100] focus:inline-flex focus:min-h-11 focus:items-center focus:bg-primary focus:px-4 focus:font-semibold focus:text-primary-foreground"
    >
      {children}
    </a>
  );
}
