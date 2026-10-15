"use client";

import { Children, cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  /** Text appended to required labels for screen readers and sighted users. */
  requiredLabel?: string;
  className?: string;
  children: ReactNode;
}

type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
};

/** Label, control, and its message, wired together: the label names the control, the message describes it. */
export function FormField({ label, error, hint, required = false, requiredLabel = "*", className, children }: FormFieldProps) {
  const generatedId = useId();
  const child = Children.only(children);
  const control = isValidElement<ControlProps>(child) ? (child as ReactElement<ControlProps>) : null;
  const controlId = control?.props.id ?? `${generatedId}-control`;
  const messageId = `${generatedId}-message`;
  const describedBy = error || hint ? messageId : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={controlId} className="text-sm font-semibold text-foreground">
        {label}
        {required && (
          <span className="ml-1 text-muted-foreground" aria-hidden="true">
            {requiredLabel}
          </span>
        )}
      </label>
      {control
        ? cloneElement(control, {
            id: controlId,
            "aria-describedby": [control.props["aria-describedby"], describedBy].filter(Boolean).join(" ") || undefined,
            "aria-invalid": error ? true : control.props["aria-invalid"],
            "aria-required": required || undefined,
          })
        : children}
      {(error || hint) && (
        <p
          id={messageId}
          role={error ? "alert" : undefined}
          className={cn("text-sm", error ? "font-medium text-destructive" : "text-muted-foreground")}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
