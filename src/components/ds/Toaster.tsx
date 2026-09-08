'use client';

import * as ToastPrimitives from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const variantStyles = {
  default: 'border-primary/20 bg-card/97',
  destructive: 'border-destructive/25 bg-card/97',
};

const barStyles = {
  default: 'bg-primary',
  destructive: 'bg-destructive',
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastPrimitives.Provider swipeDirection="right">
      {toasts.map(({ id, title, description, action, variant = 'default', open, onOpenChange }) => (
        <ToastPrimitives.Root
          key={id}
          open={open}
          onOpenChange={onOpenChange}
          className={cn(
            'pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl pr-8 shadow-2xl border backdrop-blur-md transition-[transform,opacity] duration-300 ease-out',
            variantStyles[variant as keyof typeof variantStyles] ?? variantStyles.default,
            'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full'
          )}
        >
          {/* Left accent bar */}
          <div
            className={cn(
              'w-1 self-stretch rounded-l-xl flex-shrink-0',
              barStyles[variant as keyof typeof barStyles] ?? barStyles.default
            )}
          />

          <div className="flex flex-col gap-0.5 py-3.5">
            {title && (
              <ToastPrimitives.Title
                className={cn(
                  'font-headline text-xs tracking-wide font-semibold',
                  variant === 'destructive' ? 'text-destructive' : 'text-primary'
                )}
              >
                {title}
              </ToastPrimitives.Title>
            )}
            {description && (
              <ToastPrimitives.Description className="text-xs leading-relaxed text-foreground/50 mt-0.5">
                {description}
              </ToastPrimitives.Description>
            )}
          </div>

          {action}
          <ToastPrimitives.Close
            className="absolute right-2 top-2 rounded-lg p-1 opacity-30 hover:opacity-80 transition-opacity duration-200 ease-out active:scale-[0.95]"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </ToastPrimitives.Close>
        </ToastPrimitives.Root>
      ))}
      <ToastPrimitives.Viewport className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-[380px]" />
    </ToastPrimitives.Provider>
  );
}
