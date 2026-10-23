"use client";

import { cn } from "@/lib/utils";

export interface SegmentedOption {
  value: string;
  label: string;
  /** Accessible name when the visible label is short (e.g. "EN" → "English"). */
  ariaLabel?: string;
}

interface SegmentedControlProps {
  /** Names the group for assistive tech. */
  label: string;
  value: string;
  options: readonly SegmentedOption[];
  onChange: (value: string) => void;
  className?: string;
}

/** A few mutually exclusive choices side by side, the current one raised on a light thumb (like the EN/ES switch). */
export function SegmentedControl({ label, value, options, onChange, className }: SegmentedControlProps) {
  return (
    <div role="group" aria-label={label} className={cn("inline-flex h-9 items-center rounded-full bg-foreground/[0.06] p-[3px]", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          aria-label={option.ariaLabel}
          onClick={() => option.value !== value && onChange(option.value)}
          className={cn(
            "inline-flex h-full min-w-10 items-center justify-center rounded-full px-2.5 text-xs font-semibold tracking-[0.02em]",
            "transition-[color,background-color,box-shadow] duration-snap ease-snap motion-reduce:transition-none",
            value === option.value ? "bg-background text-foreground shadow-card" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
