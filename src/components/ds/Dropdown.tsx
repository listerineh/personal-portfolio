"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dropdown = DropdownMenuPrimitive.Root;
export const DropdownTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownSeparator({ className, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>) {
  return <DropdownMenuPrimitive.Separator className={cn("my-1 h-px bg-foreground/15", className)} {...props} />;
}

export function DropdownContent({
  children,
  align = "end",
  className = "",
}: {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align}
        sideOffset={6}
        className={cn(
          "plaque z-50 min-w-[12rem] overflow-hidden p-1 shadow-lift",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-1 motion-reduce:animate-none",
          className,
        )}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

const itemBase =
  "relative flex min-h-11 cursor-pointer select-none items-center gap-2 px-3 text-[0.9375rem] text-foreground outline-none transition-colors " +
  "data-[highlighted]:bg-foreground data-[highlighted]:text-background data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

export function DropdownItem({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <DropdownMenuPrimitive.Item onClick={onClick} className={cn(itemBase, className)}>
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

export function DropdownCheckboxItem({
  children,
  checked,
  onCheckedChange,
  className = "",
}: {
  children: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(itemBase, "pl-9", className)}
    >
      <span className="absolute left-3 flex h-4 w-4 items-center justify-center border border-current">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check aria-hidden="true" className="h-3.5 w-3.5" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export function DropdownLabel({ children }: { children: React.ReactNode }) {
  return <DropdownMenuPrimitive.Label className="text-catalog px-3 py-2 text-muted-foreground">{children}</DropdownMenuPrimitive.Label>;
}
