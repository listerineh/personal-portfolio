import { cn } from "@/lib/utils";

export interface DrawingLayer {
  /** Layer name, e.g. "Interface", "API", "Data", "Infra". */
  name: string;
  /** What sits in the layer, e.g. ["Next.js", "Tailwind"]. */
  items: string[];
}

interface WorkingDrawingProps {
  /** Caption of the drawing, e.g. "Elevation · stack". */
  caption: string;
  layers: DrawingLayer[];
  className?: string;
}

/**
 * The working drawing that hangs beside a work: its architecture as a ruled elevation,
 * top layer first. Pure geometry (borders and ticks), no illustration.
 */
export function WorkingDrawing({
  caption,
  layers,
  className,
}: WorkingDrawingProps) {
  if (layers.length === 0) return null;
  return (
    <figure className={cn("text-foreground", className)}>
      <figcaption className="text-catalog text-muted-foreground">
        {caption}
      </figcaption>
      <ol className="relative mt-3 border-l border-foreground/40 pl-4">
        {layers.map((layer, index) => (
          <li key={layer.name} className="relative">
            {/* dimension tick */}
            <span
              aria-hidden="true"
              className="absolute -left-4 top-0 h-px w-3 bg-foreground/40"
            />
            <div
              className={cn(
                "border border-foreground/40 px-3 py-2.5",
                index > 0 && "-mt-px",
              )}
            >
              <p className="text-catalog flex items-baseline justify-between gap-3">
                <span className="font-semibold text-foreground">
                  {layer.name}
                </span>
                <span aria-hidden="true" className="text-muted-foreground">
                  {String(layers.length - index).padStart(2, "0")}
                </span>
              </p>
              <p className="text-catalog mt-1 text-muted-foreground">
                {layer.items.join(" · ")}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
