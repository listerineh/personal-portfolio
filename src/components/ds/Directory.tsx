import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DirectoryStop {
  number: string;
  name: string;
  href: string;
}

interface DirectoryProps {
  label: string;
  stops: DirectoryStop[];
  className?: string;
}

/** The floor plan at the entrance: every room on the route, numbered, one tap away. */
export function Directory({ label, stops, className }: DirectoryProps) {
  return (
    <nav aria-label={label} className={className}>
      <p className="text-catalog text-muted-foreground">{label}</p>
      <ol className="mt-4 border-t border-foreground/25">
        {stops.map(({ number, name, href }) => (
          <li key={href} className="border-b border-foreground/25">
            <a
              href={href}
              className="group flex min-h-14 items-baseline gap-4 py-3 outline-offset-4"
            >
              <span className="text-catalog w-6 shrink-0 text-muted-foreground">
                {number}
              </span>
              <span className="text-headline">{name}</span>
              <ArrowDown
                aria-hidden="true"
                className={cn(
                  "ml-auto h-4 w-4 self-center text-muted-foreground",
                  "transition-transform duration-snap ease-snap group-hover:translate-y-0.5 group-hover:text-primary",
                  "motion-reduce:transition-none",
                )}
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
