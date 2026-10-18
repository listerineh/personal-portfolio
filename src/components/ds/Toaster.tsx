"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/** A floating notice: rounded panel, soft shadow, a dot for its kind. Swipe to dismiss. */
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastPrimitives.Provider swipeDirection="right">
      {toasts.map(({ id, title, description, action, variant = "default", open, onOpenChange }) => (
        <ToastPrimitives.Root
          key={id}
          open={open}
          onOpenChange={onOpenChange}
          className={cn(
            "panel pointer-events-auto relative flex w-full items-start gap-3 rounded-xl bg-popover py-4 pl-4 pr-12 shadow-float",
            "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-4 motion-reduce:animate-none",
          )}
        >
          <span
            aria-hidden="true"
            className={cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", variant === "destructive" ? "bg-destructive" : "bg-primary")}
          />
          <div className="grid gap-1">
            {title && <ToastPrimitives.Title className="text-[0.9375rem] font-semibold text-foreground">{title}</ToastPrimitives.Title>}
            {description && (
              <ToastPrimitives.Description className="text-sm leading-relaxed text-muted-foreground">{description}</ToastPrimitives.Description>
            )}
          </div>

          {action}
          <ToastPrimitives.Close
            className="absolute right-1 top-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </ToastPrimitives.Close>
        </ToastPrimitives.Root>
      ))}
      <ToastPrimitives.Viewport className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:max-w-[400px]" />
    </ToastPrimitives.Provider>
  );
}
