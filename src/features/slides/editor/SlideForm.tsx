"use client";

import { useId, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { fieldBase } from "@/components/ds/Input";
import { cn } from "@/lib/utils";
import type { Slide } from "../schema";
import { LAYOUT_FIELDS, setField, type Field } from "./fields";

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
      {LAYOUT_FIELDS[slide.layout].map((field) => (
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
      ))}
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
          <select
            id={id}
            className={inputClass}
            value={(value as string) ?? field.options[0]}
            onChange={(e) => onChange(e.target.value)}
          >
            {field.options.map((option) => (
              <option key={option} value={option}>
                {t(`option.${option}`)}
              </option>
            ))}
          </select>
        </Labelled>
      );
    case "image": {
      const image = (value as { src?: string; alt?: string }) ?? {};
      return (
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1.5 text-sm font-medium">{label}</legend>
          <Labelled
            label={t("field.src")}
            error={errors[`${path}.src`]}
            hint={t("imageHint")}
            htmlFor={`${id}-src`}
          >
            <input
              id={`${id}-src`}
              className={inputClass}
              value={image.src ?? ""}
              onChange={(e) => onChange({ ...image, src: e.target.value })}
            />
          </Labelled>
          <Labelled
            label={t("field.alt")}
            error={errors[`${path}.alt`]}
            hint={t("altHint")}
            htmlFor={`${id}-alt`}
          >
            <input
              id={`${id}-alt`}
              className={inputClass}
              value={image.alt ?? ""}
              onChange={(e) => onChange({ ...image, alt: e.target.value })}
            />
          </Labelled>
        </fieldset>
      );
    }
    case "icon":
      return (
        <Labelled label={label} error={error} hint={t("iconHint")} htmlFor={id}>
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/[0.14] text-primary"
            >
              <DynamicIcon
                name={(value as IconName) ?? "circle"}
                size={18}
                fallback={() => (
                  <span className="h-2 w-2 rounded-full bg-current" />
                )}
              />
            </span>
            <input
              id={id}
              className={inputClass}
              aria-invalid={invalid}
              value={(value as string) ?? ""}
              onChange={(e) => onChange(e.target.value.trim().toLowerCase())}
            />
          </div>
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
