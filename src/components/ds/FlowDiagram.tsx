import {
  Bot,
  ChevronDown,
  ChevronRight,
  Database,
  Layers,
  MessageSquareText,
  MonitorSmartphone,
  RotateCcw,
  Server,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export type FlowKind =
  | "actor"
  | "client"
  | "service"
  | "agent"
  | "queue"
  | "store"
  | "output";

export interface FlowStep {
  label: string;
  /** One short line: the technology, or what happens at this step. */
  detail?: string;
  kind?: FlowKind;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  /** What sends work back, e.g. "A red test returns to Triage, up to 3 times." */
  loop?: string;
  /** Read out before each step's label, e.g. { agent: "AI agent" }. */
  kindLabels?: Partial<Record<FlowKind, string>>;
  className?: string;
}

const kindIcon: Record<FlowKind, LucideIcon> = {
  actor: User,
  client: MonitorSmartphone,
  service: Server,
  agent: Bot,
  queue: Layers,
  store: Database,
  output: MessageSquareText,
};

/**
 * How work moves through a system, as connected steps: a row on desktop (up to six), a column on phones.
 * AI agents carry the amber disc; everything else stays neutral. The links draw themselves in as the
 * diagram scrolls into view (only under html.js-motion; still and complete otherwise).
 */
export function FlowDiagram({
  steps,
  loop,
  kindLabels,
  className,
}: FlowDiagramProps) {
  if (steps.length === 0) return null;
  return (
    <figure className={cn("w-full", className)}>
      <ol className="flex flex-col lg:flex-row lg:items-stretch">
        {steps.map((step, index) => {
          const kind = step.kind ?? "service";
          const Icon = kindIcon[kind];
          const last = index === steps.length - 1;
          const agent = kind === "agent";
          return (
            <li
              key={`${index}-${step.label}`}
              className="flex flex-col lg:min-w-0 lg:flex-1 lg:flex-row"
            >
              <Reveal className="panel flex items-start gap-4 p-5 lg:flex-1 lg:flex-col lg:gap-5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    agent
                      ? "bg-primary/[0.14] text-primary"
                      : "bg-foreground/[0.06] text-foreground",
                  )}
                >
                  <Icon
                    className="h-[1.125rem] w-[1.125rem]"
                    strokeWidth={1.75}
                  />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-meta tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                    {kindLabels?.[kind] && (
                      <>
                        <span aria-hidden="true"> · </span>
                        <span className={cn(agent && "text-primary")}>
                          {kindLabels[kind]}
                        </span>
                      </>
                    )}
                  </span>
                  <span className="mt-1 text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-foreground">
                    {step.label}
                  </span>
                  {step.detail && (
                    <span className="mt-1 text-[0.875rem] leading-snug text-muted-foreground">
                      {step.detail}
                    </span>
                  )}
                </span>
              </Reveal>
              {!last && (
                <span
                  aria-hidden="true"
                  className="flex items-center justify-start pl-[2.125rem] lg:w-8 lg:shrink-0 lg:justify-center lg:pl-0"
                >
                  {/* Phones: a short vertical link under the icon. */}
                  <span className="flex flex-col items-center py-1 lg:hidden">
                    <span
                      data-draw="y"
                      className="block h-5 w-px origin-top bg-foreground/25"
                    />
                    <ChevronDown
                      className="-mt-1 h-3.5 w-3.5 text-foreground/40"
                      strokeWidth={2}
                    />
                  </span>
                  {/* Desktop: a horizontal link between panels. */}
                  <span className="hidden items-center lg:flex">
                    <span
                      data-draw="x"
                      className="block h-px w-4 origin-left bg-foreground/25"
                    />
                    <ChevronRight
                      className="-ml-1.5 h-3.5 w-3.5 text-foreground/40"
                      strokeWidth={2}
                    />
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {loop && (
        <figcaption className="mt-6 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground lg:mt-8">
          <RotateCcw
            aria-hidden="true"
            className="mt-[0.2rem] h-4 w-4 shrink-0 text-primary"
            strokeWidth={2}
          />
          <span className="max-w-[72ch]">{loop}</span>
        </figcaption>
      )}
    </figure>
  );
}
