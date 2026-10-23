"use client";

import { useId, useRef, useState, type DragEvent } from "react";
import Image from "next/image";
import { ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageDropzoneLabels {
  /** Main line when empty: "Drop an image here". */
  prompt: string;
  /** Formats and limits. */
  hint?: string;
  choose: string;
  replace: string;
  busy: string;
}

interface ImageDropzoneProps {
  id?: string;
  /** The current image, shown as a preview. */
  src?: string;
  alt?: string;
  /** Passed to the file input, e.g. "image/png,image/jpeg". */
  accept?: string;
  busy?: boolean;
  error?: string;
  onFile: (file: File) => void;
  labels: ImageDropzoneLabels;
  className?: string;
}

/**
 * Takes an image by drop, by picker or by paste (⌘V while the zone has focus). It only hands the File over; uploading
 * is the caller's job, which reports back through `busy` and `error`. The ground changes and an amber ring appears
 * while a file is held over it.
 */
export function ImageDropzone({ id, src, alt = "", accept = "image/*", busy = false, error, onFile, labels, className }: ImageDropzoneProps) {
  const input = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = id ?? `${generatedId}-file`;
  const messageId = `${generatedId}-message`;
  const [dragging, setDragging] = useState(false);
  const depth = useRef(0);

  const take = (files: FileList | null | undefined) => {
    const file = files?.[0];
    if (file && !busy) onFile(file);
  };

  const onDragEnter = (event: DragEvent) => {
    if (!event.dataTransfer.types.includes("Files")) return;
    event.preventDefault();
    depth.current += 1;
    setDragging(true);
  };
  const onDragLeave = () => {
    depth.current = Math.max(0, depth.current - 1);
    if (depth.current === 0) setDragging(false);
  };
  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    depth.current = 0;
    setDragging(false);
    take(event.dataTransfer.files);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        onDragEnter={onDragEnter}
        onDragOver={(event) => event.dataTransfer.types.includes("Files") && event.preventDefault()}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onPaste={(event) => take(event.clipboardData.files)}
        aria-busy={busy || undefined}
        className={cn(
          "relative flex min-h-44 flex-col items-center justify-center gap-3 overflow-hidden rounded-[22px] bg-foreground/[0.04] p-5 text-center",
          "transition-[background-color,box-shadow] duration-snap ease-snap motion-reduce:transition-none",
          dragging && "bg-primary/[0.08] shadow-[0_0_0_2px_rgb(var(--primary))]",
          error && !dragging && "shadow-[0_0_0_2px_rgb(var(--destructive)/0.6)]",
        )}
      >
        {src ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-foreground/[0.06]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="400px"
              // Local previews (picked files) can't go through the optimizer.
              unoptimized={src.startsWith("blob:") || src.startsWith("data:")}
              className="object-cover"
            />
          </div>
        ) : (
          <>
            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/[0.14] text-primary">
              <ImagePlus className="h-6 w-6" />
            </span>
            <span className="text-sm font-medium text-foreground">{labels.prompt}</span>
            {labels.hint && <span className="text-xs text-muted-foreground">{labels.hint}</span>}
          </>
        )}

        <input
          ref={input}
          id={inputId}
          type="file"
          accept={accept}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => {
            take(event.target.files);
            event.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={busy}
          aria-describedby={error ? messageId : undefined}
          onClick={() => input.current?.click()}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-foreground/[0.07] px-4 text-sm font-medium text-foreground transition-[background-color,transform] duration-snap ease-snap hover:bg-foreground/[0.11] active:scale-[0.96] disabled:opacity-60 motion-reduce:transition-none"
        >
          {src ? labels.replace : labels.choose}
        </button>

        {busy && (
          <div className="material absolute inset-0 flex items-center justify-center gap-2 text-sm font-medium" role="status">
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" />
            {labels.busy}
          </div>
        )}
      </div>
      {error && (
        <p id={messageId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
