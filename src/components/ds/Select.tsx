"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldBase } from "./Input";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  /** "" shows the placeholder (option values themselves can't be empty). */
  value: string;
  onValueChange: (value: string) => void;
  options: readonly SelectOption[];
  placeholder?: string;
  /** `sm` for dense panels (editors), `md` for forms. */
  size?: "sm" | "md";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

const sizeMap = {
  sm: "min-h-10 px-3 text-sm",
  md: "min-h-12 px-4 text-base",
};

const itemBase =
  "relative flex min-h-10 cursor-pointer select-none items-center rounded-[9px] pl-8 pr-3 text-sm text-foreground outline-none transition-colors " +
  "data-[highlighted]:bg-foreground/[0.07] data-[state=checked]:font-medium data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/** A field-styled select: the trigger reads like an Input, the list opens as a floating panel (keyboard and typeahead from Radix). */
export function Select({
  id,
  value,
  onValueChange,
  options,
  placeholder,
  size = "md",
  disabled,
  className,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className={cn(
          fieldBase,
          sizeMap[size],
          "flex items-center justify-between gap-2 text-left data-[placeholder]:text-muted-foreground",
          ariaInvalid && "border-destructive",
          className,
        )}
      >
        <span className="truncate">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className={cn(
            "panel z-50 max-h-[min(22rem,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[14px] bg-popover shadow-float",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-1 motion-reduce:animate-none",
          )}
        >
          <SelectPrimitive.Viewport className="p-1.5">
            {options.map((option) => (
              <SelectPrimitive.Item key={option.value} value={option.value} className={itemBase}>
                <span className="absolute left-2.5 flex h-4 w-4 items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
                    <Check aria-hidden="true" className="h-4 w-4 text-primary" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
