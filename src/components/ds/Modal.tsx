"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;

export function ModalContent({
  children,
  className = "",
  closeLabel = "Close",
}: {
  children: React.ReactNode;
  className?: string;
  closeLabel?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        className={cn(
          "panel fixed inset-x-0 bottom-0 z-50 max-h-[90dvh] overflow-y-auto rounded-b-none bg-popover p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-float sm:rounded-xl",
          "sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:p-8",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=open]:slide-in-from-bottom-4 sm:data-[state=open]:zoom-in-95 sm:data-[state=open]:slide-in-from-bottom-0 motion-reduce:animate-none",
          className,
        )}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground/[0.06] text-muted-foreground transition-colors hover:text-foreground"
          aria-label={closeLabel}
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function ModalHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 pr-10">{children}</div>;
}

export function ModalTitle({ children }: { children: React.ReactNode }) {
  return <DialogPrimitive.Title className="text-subhead text-foreground">{children}</DialogPrimitive.Title>;
}

export function ModalDescription({ children }: { children: React.ReactNode }) {
  return <DialogPrimitive.Description className="mt-2 text-base text-muted-foreground">{children}</DialogPrimitive.Description>;
}
