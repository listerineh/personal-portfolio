"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryOption {
  value: string;
  label: string;
  /** What choosing it gives you, drawn small (fills a 16:9 box). */
  preview: ReactNode;
}

interface GalleryPickerProps {
  /** Trigger text, e.g. "Add slide". */
  label: string;
  /** Heading inside the panel, e.g. "Choose a layout". */
  title: string;
  options: readonly GalleryOption[];
  onSelect: (value: string) => void;
  /** Which side of the trigger the panel opens on. */
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

const COLUMNS = 3;

/**
 * Picks one option by seeing it: a button that opens a floating panel of labelled previews. For choices that are
 * easier to recognize than to name (slide layouts, templates). Arrow keys move through the grid, Enter picks.
 */
export function GalleryPicker({ label, title, options, onSelect, side = "top", className }: GalleryPickerProps) {
  const [open, setOpen] = useState(false);
  const grid = useRef<HTMLDivElement>(null);

  const moveFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(grid.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: COLUMNS, ArrowUp: -COLUMNS }[event.key];
    if (index === -1 || !step) return;
    event.preventDefault();
    buttons[Math.min(buttons.length - 1, Math.max(0, index + step))]?.focus();
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        className={cn(
          "inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full bg-foreground/[0.07] px-4 text-sm font-medium text-foreground",
          "transition-[background-color,transform] duration-snap ease-snap hover:bg-foreground/[0.11] active:scale-[0.97] motion-reduce:transition-none",
          "data-[state=open]:bg-primary/[0.14] data-[state=open]:text-primary",
          className,
        )}
      >
        <Plus aria-hidden="true" className="h-4 w-4" />
        {label}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align="start"
          sideOffset={8}
          collisionPadding={12}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            grid.current?.querySelector("button")?.focus();
          }}
          className={cn(
            "panel z-50 flex max-h-[min(36rem,var(--radix-popover-content-available-height))] w-[min(40rem,calc(100vw-1.5rem))] flex-col rounded-[22px] bg-popover shadow-float",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none",
          )}
        >
          <p className="px-5 pb-2 pt-4 text-sm font-medium text-muted-foreground">{title}</p>
          <div ref={grid} onKeyDown={moveFocus} className="grid grid-cols-2 gap-3 overflow-y-auto px-4 pb-4 sm:grid-cols-3">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-label={option.label}
                onClick={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
                className="group flex flex-col gap-2 rounded-[14px] p-1.5 text-left outline-offset-0 transition-colors duration-snap ease-snap hover:bg-foreground/[0.05] focus-visible:bg-foreground/[0.05] motion-reduce:transition-none"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none relative block aspect-video w-full overflow-hidden rounded-[10px] shadow-card ring-1 ring-foreground/[0.06] transition-[box-shadow,transform] duration-glide ease-glide group-hover:-translate-y-0.5 group-hover:shadow-float group-focus-visible:shadow-float motion-reduce:transition-none"
                >
                  {option.preview}
                </span>
                <span className="px-1 text-sm font-medium text-foreground">{option.label}</span>
              </button>
            ))}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
