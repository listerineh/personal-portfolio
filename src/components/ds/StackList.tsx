import { cn } from "@/lib/utils";

export interface StackLayer {
  /** Layer name, e.g. "Interface", "API", "Data", "Infra". */
  name: string;
  /** What sits in the layer, e.g. ["Next.js", "Tailwind"]. */
  items: string[];
}

interface StackListProps {
  /** Caption, e.g. "Stack". */
  caption: string;
  layers: StackLayer[];
  className?: string;
}

/** A work's architecture, top layer first: each layer a row of rounded chips on a soft panel. */
export function StackList({ caption, layers, className }: StackListProps) {
  if (layers.length === 0) return null;
  return (
    <figure className={cn("panel p-5 md:p-6", className)}>
      <figcaption className="text-meta text-muted-foreground">
        {caption}
      </figcaption>
      <ol className="mt-4 grid gap-4">
        {layers.map((layer) => (
          <li key={layer.name} className="grid gap-2">
            <p className="text-sm font-semibold text-foreground">
              {layer.name}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="inline-flex h-7 items-center rounded-full bg-foreground/[0.06] px-3 text-xs font-medium text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  );
}
