"use client";

import Image from "next/image";
import { Briefcase } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export interface Role {
  company: string;
  jobTitle: string;
  employmentDates: string;
  location?: string;
  logoUrl?: string;
  responsibilities: string[];
  /** Open-ended role: gets the live amber dot and the current label. */
  current?: boolean;
}

interface RoleExplorerProps {
  roles: Role[];
  /** Accessible name of the tab list, e.g. "Roles". */
  label: string;
  /** Text for the live tag on current roles, e.g. "Now". */
  currentLabel: string;
  className?: string;
}

/** Company mark in a circle. Logos sit on white (they are drawn for it); no logo gets a neutral briefcase. */
function Logo({ src, size }: { src?: string; size: "sm" | "lg" }) {
  const box = size === "lg" ? "h-16 w-16" : "h-10 w-10";
  if (!src) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full bg-foreground/[0.08] text-muted-foreground ring-1 ring-foreground/[0.06]",
          box,
        )}
      >
        <Briefcase aria-hidden="true" className={size === "lg" ? "h-7 w-7" : "h-[18px] w-[18px]"} strokeWidth={1.75} />
      </span>
    );
  }
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full bg-white shadow-card ring-1 ring-black/[0.06]", box)}>
      <Image
        src={src}
        alt=""
        fill
        sizes={size === "lg" ? "64px" : "40px"}
        className={cn("object-contain", size === "lg" ? "p-3" : "p-2")}
      />
    </span>
  );
}

/**
 * Career as master/detail: a timeline of roles to pick from, and the chosen role in full beside it.
 * On phones the timeline becomes a swipeable strip of chips above the detail. Built on the ARIA tabs
 * pattern (arrow keys, Home/End); the detail rises in on each change.
 */
export function RoleExplorer({
  roles,
  label,
  currentLabel,
  className,
}: RoleExplorerProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const role = roles[active];

  const select = (index: number) => {
    const next = (index + roles.length) % roles.length;
    setActive(next);
    const tab = tabRefs.current[next];
    tab?.focus();
    tab?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => select(active + 1),
      ArrowRight: () => select(active + 1),
      ArrowUp: () => select(active - 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(roles.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  if (!role) return null;

  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      {/* Timeline / chip strip */}
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className={cn(
          "scrollbar-none -mx-gutter flex snap-x gap-2 overflow-x-auto px-gutter pb-1",
          "lg:relative lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-1 lg:self-start lg:overflow-visible lg:px-0 lg:pb-0",
        )}
      >
        {/* The line the timeline dots sit on (desktop). */}
        <span
          aria-hidden="true"
          className="absolute bottom-8 left-[27px] top-8 hidden w-px bg-foreground/10 lg:block"
        />
        {roles.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={`${item.company}-${item.employmentDates}`}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "group relative flex shrink-0 snap-start items-center gap-3 rounded-full py-2 pl-2 pr-4 text-left",
                "transition-[background-color,box-shadow,color] duration-snap ease-snap motion-reduce:transition-none",
                "lg:w-full lg:gap-4 lg:rounded-lg lg:py-4 lg:pl-3 lg:pr-5",
                selected
                  ? "bg-background text-foreground shadow-card"
                  : "bg-foreground/[0.05] text-muted-foreground hover:bg-foreground/[0.08] hover:text-foreground lg:bg-transparent lg:hover:bg-foreground/[0.04]",
              )}
            >
              {/* Timeline dot (desktop) */}
              <span
                aria-hidden="true"
                className="relative hidden h-8 w-8 shrink-0 items-center justify-center lg:flex"
              >
                {item.current && (
                  <span className="absolute h-4 w-4 rounded-full bg-primary/40 motion-safe:animate-ping" />
                )}
                <span
                  className={cn(
                    "relative h-3 w-3 rounded-full ring-4 ring-[rgb(var(--surface))] transition-colors duration-snap ease-snap",
                    item.current
                      ? "bg-primary"
                      : selected
                        ? "bg-foreground"
                        : "bg-foreground/25",
                  )}
                />
              </span>
              <Logo src={item.logoUrl} size="sm" />
              <span className="min-w-0">
                <span className="block truncate text-[0.9375rem] font-semibold text-foreground">
                  {item.company}
                </span>
                <span className="mt-0.5 hidden truncate text-[0.8125rem] lg:block">
                  {item.jobTitle} · {item.employmentDates}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="panel p-6 md:p-10 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-span-7 lg:self-start"
      >
        <div
          key={active}
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-500"
        >
          <div className="flex items-start gap-5">
            <Logo src={role.logoUrl} size="lg" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="text-subhead">{role.jobTitle}</h3>
                {role.current && (
                  <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-primary/[0.14] px-2.5 text-[0.6875rem] font-semibold text-primary">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse"
                    />
                    {currentLabel}
                  </span>
                )}
              </div>
              <p className="mt-1 text-base font-medium text-foreground/80">
                {role.company}
              </p>
              <p className="text-meta mt-1 text-muted-foreground">
                {[role.employmentDates, role.location]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-4">
            {role.responsibilities.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-foreground/85"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.2em] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/[0.14]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
