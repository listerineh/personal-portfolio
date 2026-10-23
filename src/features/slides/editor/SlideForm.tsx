"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import { IconPicker, Select } from "@/components/ds";
import { fieldBase } from "@/components/ds/Input";
import { cn } from "@/lib/utils";
import type { Slide } from "../schema";
import { LAYOUT_FIELDS, setField, type Field } from "./fields";
import { ImageField } from "./ImageField";
import { renderDiagram } from "./mermaid";
import { useDeckLook } from "./upload";
import { embedProvider, toEmbedUrl } from "../embeds";

/** path ("items.2.title") → message, for the slide being edited. */
export type FieldErrors = Record<string, string>;

const inputClass = cn(fieldBase, "min-h-10 px-3 text-sm");
const areaClass = cn(
  fieldBase,
  "min-h-[5.5rem] px-3 py-2 text-sm leading-relaxed",
);

export function SlideForm({
  slide,
  errors,
  onChange,
}: {
  slide: Slide;
  errors: FieldErrors;
  onChange: (slide: Slide) => void;
}) {
  const record = slide as unknown as Record<string, unknown>;
  return (
    <div className="flex flex-col gap-5">
      {LAYOUT_FIELDS[slide.layout].map((field) =>
        field.kind === "diagram" ? (
          <DiagramField
            key={`${slide.id}-${field.key}`}
            slideId={slide.id}
            source={(record.source as string) ?? ""}
            svg={record.svg as string | undefined}
            error={errors[field.key] ?? errors.svg ?? errors.svgDark}
            onPatch={(patch) => {
              let next = record;
              for (const [key, value] of Object.entries(patch)) next = setField(next, key, value, key !== "source");
              onChange(next as unknown as Slide);
            }}
          />
        ) : (
        <FieldControl
          key={`${slide.id}-${field.key}`}
          field={field}
          path={field.key}
          value={record[field.key]}
          errors={errors}
          onChange={(value) =>
            onChange(
              setField(
                record,
                field.key,
                value,
                field.optional,
              ) as unknown as Slide,
            )
          }
        />
        ),
      )}
    </div>
  );
}

interface ControlProps {
  field: Field;
  path: string;
  value: unknown;
  errors: FieldErrors;
  onChange: (value: unknown) => void;
}

function Labelled({
  label,
  error,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {(error || hint) && (
        <p
          role={error ? "alert" : undefined}
          className={cn(
            "text-xs",
            error ? "font-medium text-destructive" : "text-muted-foreground",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

function FieldControl({ field, path, value, errors, onChange }: ControlProps) {
  const t = useTranslations("slidesEditor");
  const id = useId();
  const label = `${t(`field.${field.key}`)}${field.optional ? ` (${t("optional")})` : ""}`;
  const error = errors[path];
  const invalid = error ? true : undefined;

  switch (field.kind) {
    case "text":
      return (
        <Labelled label={label} error={error} htmlFor={id}>
          <input
            id={id}
            className={inputClass}
            aria-invalid={invalid}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </Labelled>
      );
    case "rich":
      return (
        <Labelled label={label} error={error} hint={t("richHint")} htmlFor={id}>
          {field.multiline ? (
            <textarea
              id={id}
              className={areaClass}
              aria-invalid={invalid}
              value={(value as string) ?? ""}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <input
              id={id}
              className={inputClass}
              aria-invalid={invalid}
              value={(value as string) ?? ""}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        </Labelled>
      );
    case "code":
      return (
        <Labelled label={label} error={error} htmlFor={id}>
          <textarea
            id={id}
            rows={9}
            spellCheck={false}
            className={cn(areaClass, "font-mono text-[0.8125rem]")}
            aria-invalid={invalid}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </Labelled>
      );
    case "number":
      return (
        <Labelled label={label} error={error} htmlFor={id}>
          <input
            id={id}
            type="number"
            step="any"
            className={inputClass}
            aria-invalid={invalid}
            value={Number.isFinite(value as number) ? (value as number) : ""}
            onChange={(e) =>
              onChange(
                e.target.value === "" ? Number.NaN : Number(e.target.value),
              )
            }
          />
        </Labelled>
      );
    case "select":
      return (
        <Labelled label={label} error={error} htmlFor={id}>
          <Select
            id={id}
            size="sm"
            aria-invalid={invalid}
            value={(value as string) ?? field.options[0]}
            onValueChange={onChange}
            options={field.options.map((option) => ({ value: option, label: t(`option.${option}`) }))}
          />
        </Labelled>
      );
    case "image":
      return (
        <ImageField
          label={label}
          value={(value as { src?: string; alt?: string }) ?? {}}
          errors={{ src: errors[`${path}.src`] ?? error, alt: errors[`${path}.alt`] }}
          onChange={onChange}
        />
      );
    case "embed":
      return <EmbedField id={id} label={label} value={(value as string) ?? ""} error={error} onChange={onChange} />;
    case "icon":
      return (
        <Labelled label={label} error={error} htmlFor={id}>
          <IconPicker
            id={id}
            value={(value as string) ?? ""}
            onChange={onChange}
            aria-invalid={invalid}
            labels={{ search: t("iconSearch"), empty: t("iconEmpty"), choose: t("iconChoose") }}
          />
        </Labelled>
      );
    case "list":
      return (
        <ListControl
          field={field}
          path={path}
          label={label}
          value={(value as string[]) ?? []}
          errors={errors}
          onChange={onChange}
        />
      );
    case "objects":
      return (
        <ObjectsControl
          field={field}
          path={path}
          label={label}
          value={(value as Record<string, unknown>[]) ?? []}
          errors={errors}
          onChange={onChange}
        />
      );
  }
}

/** Move, remove and add for repeated rows. */
function RowTools({
  index,
  count,
  min,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  min: number;
  onMove: (to: number) => void;
  onRemove: () => void;
}) {
  const t = useTranslations("slidesEditor");
  const button =
    "flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/[0.07] hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent";
  return (
    <div className="flex shrink-0 items-center">
      <button
        type="button"
        className={button}
        aria-label={t("moveUp")}
        disabled={index === 0}
        onClick={() => onMove(index - 1)}
      >
        <ArrowUp aria-hidden="true" className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={button}
        aria-label={t("moveDown")}
        disabled={index === count - 1}
        onClick={() => onMove(index + 1)}
      >
        <ArrowDown aria-hidden="true" className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={button}
        aria-label={t("remove")}
        disabled={count <= min}
        onClick={onRemove}
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}

function move<T>(list: T[], from: number, to: number): T[] {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function AddButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex min-h-9 items-center gap-1.5 self-start rounded-full bg-foreground/[0.07] px-3.5 text-sm font-medium hover:bg-foreground/[0.11] disabled:opacity-40"
    >
      <Plus aria-hidden="true" className="h-4 w-4" />
      {label}
    </button>
  );
}

function ListControl({
  field,
  path,
  label,
  value,
  errors,
  onChange,
}: Omit<ControlProps, "field" | "value"> & {
  field: Extract<Field, { kind: "list" }>;
  label: string;
  value: string[];
}) {
  const t = useTranslations("slidesEditor");
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1.5 text-sm font-medium">{label}</legend>
      {value.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <input
              aria-label={`${label} ${index + 1}`}
              className={inputClass}
              aria-invalid={errors[`${path}.${index}`] ? true : undefined}
              value={item}
              onChange={(e) =>
                onChange(
                  value.map((current, i) =>
                    i === index ? e.target.value : current,
                  ),
                )
              }
            />
            <RowTools
              index={index}
              count={value.length}
              min={field.min}
              onMove={(to) => onChange(move(value, index, to))}
              onRemove={() => onChange(value.filter((_, i) => i !== index))}
            />
          </div>
          {errors[`${path}.${index}`] && (
            <p className="text-xs font-medium text-destructive">
              {errors[`${path}.${index}`]}
            </p>
          )}
        </div>
      ))}
      {errors[path] && (
        <p className="text-xs font-medium text-destructive">{errors[path]}</p>
      )}
      <p className="text-xs text-muted-foreground">{t("richHint")}</p>
      <AddButton
        label={t("add")}
        disabled={value.length >= field.max}
        onClick={() => onChange([...value, ""])}
      />
    </fieldset>
  );
}

function ObjectsControl({
  field,
  path,
  label,
  value,
  errors,
  onChange,
}: Omit<ControlProps, "field" | "value"> & {
  field: Extract<Field, { kind: "objects" }>;
  label: string;
  value: Record<string, unknown>[];
}) {
  const t = useTranslations("slidesEditor");
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-1.5 text-sm font-medium">{label}</legend>
      {value.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 rounded-[14px] bg-foreground/[0.04] p-4"
        >
          <div className="-mr-2 -mt-2 flex items-center justify-between">
            <span className="text-meta text-muted-foreground">
              #{index + 1}
            </span>
            <RowTools
              index={index}
              count={value.length}
              min={field.min}
              onMove={(to) => onChange(move(value, index, to))}
              onRemove={() => onChange(value.filter((_, i) => i !== index))}
            />
          </div>
          {field.fields.map((sub) => (
            <FieldControl
              key={sub.key}
              field={sub}
              path={`${path}.${index}.${sub.key}`}
              value={item[sub.key]}
              errors={errors}
              onChange={(next) =>
                onChange(
                  value.map((current, i) =>
                    i === index
                      ? setField(current, sub.key, next, sub.optional)
                      : current,
                  ),
                )
              }
            />
          ))}
        </div>
      ))}
      {errors[path] && (
        <p className="text-xs font-medium text-destructive">{errors[path]}</p>
      )}
      {field.max > field.min && (
        <AddButton
          label={t("add")}
          disabled={value.length >= field.max}
          onClick={() => onChange([...value, structuredClone(field.template)])}
        />
      )}
    </fieldset>
  );
}

/** A pasted link becomes its embed form right away; the field keeps what was typed until it is a supported link. */
function EmbedField({ id, label, value, error, onChange }: { id: string; label: string; value: string; error?: string; onChange: (value: unknown) => void }) {
  const t = useTranslations("slidesEditor");
  const [draft, setDraft] = useState(value);
  const embed = toEmbedUrl(draft);
  const provider = embedProvider(embed ?? undefined);
  return (
    <Labelled
      label={label}
      error={draft && !embed ? t("embedUnsupported") : error}
      hint={provider ? t("embedReady", { provider }) : t("embedHint")}
      htmlFor={id}
    >
      <input
        id={id}
        className={inputClass}
        inputMode="url"
        placeholder="https://youtu.be/…"
        aria-invalid={draft && !embed ? true : undefined}
        value={draft}
        onChange={(e) => {
          const next = e.target.value.trim();
          setDraft(e.target.value);
          onChange(next === "" ? "" : (toEmbedUrl(next) ?? next));
        }}
      />
    </Labelled>
  );
}

/** Mermaid source; renders for both slide themes shortly after typing stops and stores the SVGs with the slide. */
function DiagramField({
  slideId,
  source,
  svg,
  error,
  onPatch,
}: {
  slideId: string;
  source: string;
  svg?: string;
  error?: string;
  onPatch: (patch: { source?: string; svg?: string; svgDark?: string }) => void;
}) {
  const t = useTranslations("slidesEditor");
  const id = useId();
  const { accent } = useDeckLook();
  const [renderError, setRenderError] = useState<string | null>(null);
  const [rendering, setRendering] = useState(false);
  const latest = useRef({ svg, onPatch });
  useEffect(() => {
    latest.current = { svg, onPatch };
  });

  useEffect(() => {
    if (!source.trim()) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setRendering(true);
      const result = await renderDiagram(source, accent, `d-${slideId}`);
      if (cancelled) return;
      setRendering(false);
      if (!result.ok) {
        setRenderError(result.error);
        return;
      }
      setRenderError(null);
      // Same output (a slide opened again): nothing to save.
      if (result.svg !== latest.current.svg) latest.current.onPatch({ svg: result.svg, svgDark: result.svgDark });
    }, 500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [source, accent, slideId]);

  return (
    <Labelled
      label={t("field.source")}
      error={renderError ? t("diagramError", { message: renderError }) : error}
      hint={rendering ? t("diagramRendering") : t("diagramHint")}
      htmlFor={id}
    >
      <textarea
        id={id}
        rows={9}
        spellCheck={false}
        className={cn(areaClass, "font-mono text-[0.8125rem]")}
        aria-invalid={renderError ? true : undefined}
        value={source}
        onChange={(e) => onPatch({ source: e.target.value })}
      />
    </Labelled>
  );
}
