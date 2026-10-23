"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ChevronDown, Search } from "lucide-react";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";
import { fieldBase } from "./Input";

export interface IconPickerLabels {
  /** Placeholder of the search field: "Search icons". */
  search: string;
  /** Shown when nothing matches. */
  empty: string;
  /** Trigger text when no icon is set. */
  choose: string;
}

interface IconPickerProps {
  id?: string;
  /** A Lucide icon name, e.g. "file-down". */
  value?: string;
  onChange: (name: string) => void;
  labels: IconPickerLabels;
  /** Shown before anything is typed; defaults to icons that come up in talks. */
  suggestions?: readonly string[];
  "aria-invalid"?: boolean;
  className?: string;
}

const COLUMNS = 6;
const MAX_RESULTS = 48;
const ALL = new Set<string>(iconNames);

export const DEFAULT_ICON_SUGGESTIONS = [
  "sparkles", "rocket", "lightbulb", "target", "zap", "brain",
  "bot", "code", "terminal", "database", "cloud", "server",
  "cpu", "layers", "workflow", "git-branch", "shield-check", "lock",
  "users", "user", "message-circle", "mic", "presentation", "chart-line",
  "trending-up", "globe", "smartphone", "monitor", "keyboard", "palette",
  "book-open", "graduation-cap", "calendar", "clock", "map-pin", "heart",
  "star", "flag", "check", "search", "settings", "wrench",
  "package", "file-down", "github", "layout-grid", "puzzle", "coffee",
] as const;

/**
 * Picks a Lucide icon: a field-like trigger showing the current one, then a searchable grid in a floating panel.
 * Arrow keys move through the grid, Enter picks. Only real icon names can be chosen.
 */
export function IconPicker({ id, value, onChange, labels, suggestions = DEFAULT_ICON_SUGGESTIONS, "aria-invalid": ariaInvalid, className }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const grid = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s+/g, "-");
    if (!q) return suggestions.filter((name) => ALL.has(name));
    // Names that start with the query first, then names that contain it.
    const starts: string[] = [];
    const contains: string[] = [];
    for (const name of iconNames) {
      if (name.startsWith(q)) starts.push(name);
      else if (name.includes(q)) contains.push(name);
    }
    return [...starts, ...contains].slice(0, MAX_RESULTS);
  }, [query, suggestions]);

  const pick = (name: string) => {
    onChange(name);
    setOpen(false);
    setQuery("");
  };

  const moveFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(grid.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index === -1) return;
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: COLUMNS, ArrowUp: -COLUMNS }[event.key];
    if (!step) return;
    event.preventDefault();
    buttons[Math.min(buttons.length - 1, Math.max(0, index + step))]?.focus();
  };

  const known = value && ALL.has(value);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        id={id}
        aria-invalid={ariaInvalid}
        className={cn(fieldBase, "flex min-h-10 items-center gap-2.5 px-2 text-left text-sm", ariaInvalid && "border-destructive", className)}
      >
        <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/[0.14] text-primary">
          {known ? <DynamicIcon name={value as IconName} size={16} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
        </span>
        <span className={cn("flex-1 truncate", !value && "text-muted-foreground")}>{value || labels.choose}</span>
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          collisionPadding={12}
          className={cn(
            "panel z-50 w-[19.5rem] rounded-[14px] bg-popover p-2 shadow-float",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none",
          )}
        >
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              type="search"
              aria-label={labels.search}
              placeholder={labels.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  grid.current?.querySelector("button")?.focus();
                }
                if (e.key === "Enter" && results[0]) {
                  e.preventDefault();
                  pick(results[0]);
                }
              }}
              className={cn(fieldBase, "min-h-10 pl-9 pr-3 text-sm")}
            />
          </div>
          {results.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">{labels.empty}</p>
          ) : (
            <div ref={grid} onKeyDown={moveFocus} className="mt-2 grid max-h-64 grid-cols-6 gap-1 overflow-y-auto p-0.5">
              {results.map((name) => (
                <button
                  key={name}
                  type="button"
                  title={name}
                  aria-label={name}
                  aria-pressed={name === value}
                  onClick={() => pick(name)}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-[10px] text-foreground transition-colors duration-snap ease-snap motion-reduce:transition-none",
                    "hover:bg-foreground/[0.07] focus-visible:bg-foreground/[0.07]",
                    name === value && "bg-primary/[0.14] text-primary",
                  )}
                >
                  <DynamicIcon name={name as IconName} size={20} />
                </button>
              ))}
            </div>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
