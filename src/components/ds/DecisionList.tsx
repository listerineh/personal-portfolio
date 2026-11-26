import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export interface Decision {
  /** The choice, stated as what was done, e.g. "Process video in the browser". */
  title: string;
  why: string;
  tradeoff: string;
}

interface DecisionListProps {
  decisions: Decision[];
  /** Column captions, e.g. { why: "Why", tradeoff: "What it cost" }. */
  labels: { why: string; tradeoff: string };
  className?: string;
}

/**
 * Engineering decisions, numbered: the choice on the left, why and what it cost on the right. One panel per
 * decision; on phones the three parts stack.
 */
export function DecisionList({
  decisions,
  labels,
  className,
}: DecisionListProps) {
  if (decisions.length === 0) return null;
  return (
    <ol className={cn("grid gap-4 md:gap-5", className)}>
      {decisions.map((decision, index) => (
        <Reveal
          as="li"
          key={decision.title}
          className="panel grid gap-6 p-6 md:p-8 lg:grid-cols-12 lg:gap-10"
        >
          <div className="lg:col-span-5">
            <span className="text-meta tabular-nums text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-[1.375rem] font-semibold leading-tight tracking-[-0.025em] text-foreground md:text-[1.5rem]">
              {decision.title}
            </h3>
          </div>
          <dl className="grid gap-5 sm:grid-cols-2 sm:gap-8 lg:col-span-7">
            <div>
              <dt className="text-meta text-muted-foreground">{labels.why}</dt>
              <dd className="mt-2 text-[1rem] leading-relaxed text-foreground/85">
                {decision.why}
              </dd>
            </div>
            <div>
              <dt className="text-meta text-muted-foreground">
                {labels.tradeoff}
              </dt>
              <dd className="mt-2 text-[1rem] leading-relaxed text-foreground/85">
                {decision.tradeoff}
              </dd>
            </div>
          </dl>
        </Reveal>
      ))}
    </ol>
  );
}
