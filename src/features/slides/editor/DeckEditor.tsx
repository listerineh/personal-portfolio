"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, Copy, ExternalLink, Plus, Trash2 } from "lucide-react";
import { Select, Switch } from "@/components/ds";
import { fieldBase } from "@/components/ds/Input";
import { cn } from "@/lib/utils";
import { deckSchema, type Deck, type Slide, type SlideLayout } from "../schema";
import { stepCount } from "../steps";
import { ACCENT_PRESETS, accentStyle, accentTokens } from "../theme";
import { SlideCanvas, SlideFrame } from "../renderer/SlideView";
import { deleteDeckAction, saveDeckAction } from "../actions";
import {
  BUILDABLE,
  changeLayout,
  LAYOUTS,
  newSlideId,
  setField,
  slideTemplate,
} from "./fields";
import { SlideForm, type FieldErrors } from "./SlideForm";

type SaveState =
  | "saved"
  | "dirty"
  | "saving"
  | "invalid"
  | "conflict"
  | "error"
  | "unauthorized";

const AUTOSAVE_AFTER = 1500;
const inputClass = cn(fieldBase, "min-h-10 px-3 text-sm");
const HEX = /^#[0-9a-f]{6}$/i;

/** Issues grouped by where they show: deck settings ("title") or a slide (index → "items.2"). */
function groupIssues(deck: Deck, required: string) {
  const parsed = deckSchema.safeParse(deck);
  const slides: Record<number, FieldErrors> = {};
  const settings: FieldErrors = {};
  if (parsed.success) return { valid: true, slides, settings, count: 0 };
  for (const issue of parsed.error.issues) {
    const [head, index, ...rest] = issue.path;
    // An emptied required field is the common case; say it plainly instead of zod's wording.
    const message = issue.code === "too_small" && issue.type === "string" && issue.minimum === 1 ? required : issue.message;
    if (head === "slides" && typeof index === "number") {
      (slides[index] ??= {})[rest.join(".") || ""] = message;
    } else {
      settings[issue.path.join(".")] = message;
    }
  }
  return { valid: false, slides, settings, count: parsed.error.issues.length };
}

export function DeckEditor({ initialDeck }: { initialDeck: Deck }) {
  const t = useTranslations("slidesEditor");
  const [deck, setDeck] = useState<Deck>(initialDeck);
  const [selected, setSelected] = useState(0);
  const [panel, setPanel] = useState<"slide" | "deck">("slide");
  const [state, setState] = useState<SaveState>("saved");
  const [conflictVersion, setConflictVersion] = useState<number | null>(null);

  // Refs let the save loop read the latest edit without re-subscribing timers.
  const deckRef = useRef(deck);
  const versionRef = useRef(initialDeck.version);
  const editSeq = useRef(0);
  const saving = useRef(false);

  const issues = useMemo(() => groupIssues(deck, t("required")), [deck, t]);
  const slide = deck.slides[Math.min(selected, deck.slides.length - 1)];

  const update = useCallback((next: Deck) => {
    deckRef.current = next;
    editSeq.current += 1;
    setDeck(next);
    setState((current) =>
      current === "conflict" || current === "unauthorized" ? current : "dirty",
    );
  }, []);

  const updateSlide = useCallback(
    (index: number, next: Slide) =>
      update({
        ...deckRef.current,
        slides: deckRef.current.slides.map((s, i) => (i === index ? next : s)),
      }),
    [update],
  );

  const save = useCallback(async (expected = versionRef.current) => {
    if (saving.current) return;
    const snapshot = deckRef.current;
    const seq = editSeq.current;
    if (!deckSchema.safeParse(snapshot).success) {
      setState("invalid");
      return;
    }
    saving.current = true;
    setState("saving");
    const result = await saveDeckAction(snapshot, expected).catch(() => ({
      ok: false as const,
      reason: "error" as const,
    }));
    saving.current = false;
    if (result.ok) {
      versionRef.current = result.deck.version;
      setConflictVersion(null);
      // Edits made while the request was in flight stay pending; autosave picks them up.
      setState(editSeq.current === seq ? "saved" : "dirty");
      return;
    }
    if (result.reason === "conflict") {
      setConflictVersion(result.currentVersion);
      setState("conflict");
    } else if (result.reason === "invalid") {
      setState("invalid");
    } else {
      setState(result.reason);
    }
  }, []);

  // Autosave once typing pauses, only when the deck is valid and nothing is blocking.
  useEffect(() => {
    if (state !== "dirty" || !issues.valid) return;
    const timer = window.setTimeout(() => void save(), AUTOSAVE_AFTER);
    return () => window.clearTimeout(timer);
  }, [deck, state, issues.valid, save]);

  // ⌘S / Ctrl+S saves now.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  // Leaving with unsaved work asks first.
  useEffect(() => {
    if (state === "saved") return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [state]);

  const addSlide = (layout: SlideLayout) => {
    const at = selected + 1;
    const slides = [...deck.slides];
    slides.splice(at, 0, slideTemplate(layout));
    update({ ...deck, slides });
    setSelected(at);
    setPanel("slide");
  };

  const duplicateSlide = () => {
    const slides = [...deck.slides];
    slides.splice(selected + 1, 0, {
      ...structuredClone(slide),
      id: newSlideId(),
    });
    update({ ...deck, slides });
    setSelected(selected + 1);
  };

  const removeSlide = () => {
    if (deck.slides.length <= 1) return;
    update({ ...deck, slides: deck.slides.filter((_, i) => i !== selected) });
    setSelected(Math.max(0, selected - 1));
  };

  const moveSlide = (from: number, to: number) => {
    if (to < 0 || to >= deck.slides.length) return;
    const slides = [...deck.slides];
    const [item] = slides.splice(from, 1);
    slides.splice(to, 0, item);
    update({ ...deck, slides });
    setSelected(to);
  };

  const deckScope = {
    "data-theme": deck.theme,
    style: HEX.test(deck.accent)
      ? accentStyle(deck.accent, deck.theme)
      : undefined,
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <Link
          href="/slides/manage"
          aria-label={t("backToManage")}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-foreground/[0.07]"
        >
          <ArrowLeft aria-hidden="true" className="h-5 w-5" />
        </Link>
        <h1 className="min-w-0 truncate text-[0.9375rem] font-semibold">
          {deck.title}
        </h1>
        <SaveStatus state={state === "dirty" && !issues.valid ? "invalid" : state} errorCount={issues.count} />
        <div className="ml-auto flex items-center gap-2">
          <label className="sr-only" htmlFor="deck-status">
            {t("field.status")}
          </label>
          <Select
            id="deck-status"
            size="sm"
            className="w-36"
            value={deck.status}
            onValueChange={(value) => update({ ...deck, status: value as Deck["status"] })}
            options={(["draft", "unlisted", "published"] as const).map((status) => ({ value: status, label: t(`status.${status}`) }))}
          />
          <Link
            href={`/slides/${deck.slug}#/${selected + 1}`}
            target="_blank"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium hover:bg-foreground/[0.07]"
          >
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            {t("view")}
          </Link>
          <button
            type="button"
            onClick={() => void save()}
            disabled={state === "saving" || state === "saved"}
            className="inline-flex min-h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:brightness-[1.07] disabled:opacity-50"
          >
            {t("save")}
          </button>
        </div>
      </header>

      {state === "conflict" && (
        <div
          role="alert"
          className="flex flex-wrap items-center gap-3 bg-primary/[0.14] px-4 py-3 text-sm"
        >
          <span>{t("conflict", { version: conflictVersion ?? "?" })}</span>
          <button
            type="button"
            className="font-medium underline"
            onClick={() => window.location.reload()}
          >
            {t("conflictReload")}
          </button>
          <button
            type="button"
            className="font-medium underline"
            onClick={() =>
              conflictVersion !== null && void save(conflictVersion)
            }
          >
            {t("conflictOverwrite")}
          </button>
        </div>
      )}
      {state === "unauthorized" && (
        <div
          role="alert"
          className="bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {t("unauthorized")}{" "}
          <Link href="/slides/manage" className="font-medium underline">
            {t("signInAgain")}
          </Link>
        </div>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[200px_minmax(0,1fr)_400px] lg:overflow-hidden">
        {/* Slides */}
        <nav
          aria-label={t("slides")}
          className="deck hidden min-h-0 flex-col border-r lg:flex"
          {...deckScope}
        >
          <ol className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
            {deck.slides.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(index);
                    setPanel("slide");
                  }}
                  aria-current={index === selected ? "true" : undefined}
                  aria-label={t("slideN", {
                    n: index + 1,
                    layout: t(`layout.${item.layout}`),
                  })}
                  className={cn(
                    "flex w-full items-start gap-2 rounded-[10px] p-1 text-left outline-offset-2",
                    index === selected
                      ? "ring-2 ring-primary"
                      : "hover:ring-1 hover:ring-foreground/20",
                    issues.slides[index] && "ring-2 ring-destructive",
                  )}
                >
                  <span className="text-meta w-4 shrink-0 pt-0.5 text-muted-foreground">
                    {index + 1}
                  </span>
                  <span
                    className="pointer-events-none min-w-0 flex-1"
                    aria-hidden="true"
                  >
                    <SlideFrame bare>
                      <SlideCanvas
                        slide={item}
                        lang={deck.lang}
                        state={{
                          active: false,
                          still: true,
                          step: 0,
                          deckTitle: deck.title,
                          index,
                          total: deck.slides.length,
                        }}
                      />
                    </SlideFrame>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="border-t bg-background p-3">
            <AddSlide onAdd={addSlide} />
          </div>
        </nav>

        {/* Preview */}
        <section
          aria-label={t("preview")}
          className="deck relative min-h-[40vh] p-4 lg:min-h-0 lg:p-8"
          {...deckScope}
        >
          <SlideFrame fit="contain">
            <SlideCanvas
              slide={slide}
              lang={deck.lang}
              state={{
                active: false,
                still: false,
                step: stepCount(slide),
                deckTitle: deck.title,
                index: selected,
                total: deck.slides.length,
              }}
            />
          </SlideFrame>
        </section>

        {/* Panel */}
        <aside className="flex min-h-0 flex-col border-l">
          <div
            role="tablist"
            aria-label={t("panel")}
            className="flex shrink-0 gap-1 border-b p-2"
          >
            {(["slide", "deck"] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                type="button"
                aria-selected={panel === tab}
                onClick={() => setPanel(tab)}
                className={cn(
                  "min-h-9 flex-1 rounded-full text-sm font-medium",
                  panel === tab
                    ? "bg-foreground text-background"
                    : "hover:bg-foreground/[0.07]",
                )}
              >
                {t(`tab.${tab}`)}
                {tab === "deck" && Object.keys(issues.settings).length > 0 && (
                  <span className="ml-1 text-destructive">•</span>
                )}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="min-h-0 flex-1 overflow-y-auto p-5">
            {panel === "slide" ? (
              <SlidePanel
                slide={slide}
                index={selected}
                total={deck.slides.length}
                errors={issues.slides[selected] ?? {}}
                onChange={(next) => updateSlide(selected, next)}
                onMove={(to) => moveSlide(selected, to)}
                onDuplicate={duplicateSlide}
                onRemove={removeSlide}
                onAdd={addSlide}
              />
            ) : (
              <DeckSettings
                deck={deck}
                errors={issues.settings}
                onChange={update}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function SaveStatus({
  state,
  errorCount,
}: {
  state: SaveState;
  errorCount: number;
}) {
  const t = useTranslations("slidesEditor");
  const tone =
    state === "saved"
      ? "text-muted-foreground"
      : state === "dirty" || state === "saving"
        ? "text-foreground"
        : "text-destructive";
  return (
    <p className={cn("text-meta shrink-0", tone)} aria-live="polite">
      {state === "invalid"
        ? t("saveState.invalid", { count: errorCount })
        : t(`saveState.${state}`)}
    </p>
  );
}

function AddSlide({ onAdd }: { onAdd: (layout: SlideLayout) => void }) {
  const id = useId();
  const t = useTranslations("slidesEditor");
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium">
        <Plus aria-hidden="true" className="h-4 w-4" />
        {t("addSlide")}
      </label>
      <Select
        id={id}
        size="sm"
        value=""
        placeholder={t("chooseLayout")}
        onValueChange={(value) => value && onAdd(value as SlideLayout)}
        options={LAYOUTS.map((layout) => ({ value: layout, label: t(`layout.${layout}`) }))}
      />
    </div>
  );
}

function SlidePanel({
  slide,
  index,
  total,
  errors,
  onChange,
  onMove,
  onDuplicate,
  onRemove,
  onAdd,
}: {
  slide: Slide;
  index: number;
  total: number;
  errors: FieldErrors;
  onChange: (slide: Slide) => void;
  onMove: (to: number) => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onAdd: (layout: SlideLayout) => void;
}) {
  const t = useTranslations("slidesEditor");
  const tool =
    "flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium hover:bg-foreground/[0.07] disabled:opacity-40";
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <p className="text-meta text-muted-foreground">
          {t("slideOf", { n: index + 1, total })}
        </p>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="editor-field-2" className="text-sm font-medium">{t("field.layout")}</label>
          <Select
            id="editor-field-2"
            size="sm"
            value={slide.layout}
            onValueChange={(value) => onChange(changeLayout(slide, value as SlideLayout))}
            options={LAYOUTS.map((layout) => ({ value: layout, label: t(`layout.${layout}`) }))}
          />
        </div>
        <div className="-ml-3 flex flex-wrap items-center">
          <button
            type="button"
            className={tool}
            disabled={index === 0}
            onClick={() => onMove(index - 1)}
          >
            {t("moveUp")}
          </button>
          <button
            type="button"
            className={tool}
            disabled={index === total - 1}
            onClick={() => onMove(index + 1)}
          >
            {t("moveDown")}
          </button>
          <button type="button" className={tool} onClick={onDuplicate}>
            <Copy aria-hidden="true" className="h-4 w-4" />
            {t("duplicate")}
          </button>
          <button
            type="button"
            className={cn(tool, "text-destructive")}
            disabled={total <= 1}
            onClick={onRemove}
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
            {t("delete")}
          </button>
        </div>
        {/* Phones and tablets have no thumbnail rail: slides are added here. */}
        <div className="lg:hidden">
          <AddSlide onAdd={onAdd} />
        </div>
      </div>

      <SlideForm slide={slide} errors={errors} onChange={onChange} />

      {BUILDABLE.has(slide.layout) && (
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="slide-build" className="text-sm">
            <span className="font-medium">{t("field.build")}</span>
            <span className="block text-xs text-muted-foreground">
              {t("buildHint")}
            </span>
          </label>
          <Switch
            id="slide-build"
            checked={!!slide.build}
            onCheckedChange={(checked) =>
              onChange(
                setField(
                  slide as unknown as Record<string, unknown>,
                  "build",
                  checked || undefined,
                  true,
                ) as unknown as Slide,
              )
            }
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="editor-field-3" className="text-sm font-medium">{t("field.notes")}</label>
        <textarea id="editor-field-3"
          className={cn(fieldBase, "min-h-28 px-3 py-2 text-sm")}
          value={slide.notes ?? ""}
          onChange={(e) =>
            onChange(
              setField(
                slide as unknown as Record<string, unknown>,
                "notes",
                e.target.value,
                true,
              ) as unknown as Slide,
            )
          }
        />
        <span className="text-xs text-muted-foreground">{t("notesHint")}</span>
      </div>
    </div>
  );
}

function DeckSettings({
  deck,
  errors,
  onChange,
}: {
  deck: Deck;
  errors: FieldErrors;
  onChange: (deck: Deck) => void;
}) {
  const t = useTranslations("slidesEditor");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = (key: keyof Deck, value: unknown, optional = false) =>
    onChange(
      setField(
        deck as unknown as Record<string, unknown>,
        key,
        value,
        optional,
      ) as unknown as Deck,
    );
  const warning = HEX.test(deck.accent)
    ? accentTokens(deck.accent, deck.theme).warning
    : undefined;
  const error = (key: string) =>
    errors[key] && (
      <p className="text-xs font-medium text-destructive">{errors[key]}</p>
    );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="editor-field-4" className="text-sm font-medium">{t("field.title")}</label>
        <input id="editor-field-4"
          className={inputClass}
          value={deck.title}
          onChange={(e) => set("title", e.target.value)}
        />
        {error("title")}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="editor-field-5" className="text-sm font-medium">{t("field.description")}</label>
        <textarea id="editor-field-5"
          className={cn(fieldBase, "min-h-20 px-3 py-2 text-sm")}
          value={deck.description}
          onChange={(e) => set("description", e.target.value)}
        />
        <span className="text-xs text-muted-foreground">
          {t("descriptionHint")}
        </span>
        {error("description")}
      </div>
      <p className="text-meta text-muted-foreground">/slides/{deck.slug}</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="editor-field-6" className="text-sm font-medium">{t("field.lang")}</label>
          <Select
            id="editor-field-6"
            size="sm"
            value={deck.lang}
            onValueChange={(value) => set("lang", value)}
            options={[
              { value: "es", label: "Español" },
              { value: "en", label: "English" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="editor-field-7" className="text-sm font-medium">{t("field.theme")}</label>
          <Select
            id="editor-field-7"
            size="sm"
            value={deck.theme}
            onValueChange={(value) => set("theme", value)}
            options={[
              { value: "light", label: t("option.light") },
              { value: "dark", label: t("option.dark") },
            ]}
          />
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1.5 text-sm font-medium">
          {t("field.accent")}
        </legend>
        <div className="flex flex-wrap gap-2">
          {Object.entries(ACCENT_PRESETS).map(([name, hex]) => (
            <button
              key={name}
              type="button"
              aria-label={t(`accent.${name}`)}
              aria-pressed={deck.accent.toLowerCase() === hex}
              onClick={() => set("accent", hex)}
              className="h-9 w-9 rounded-full ring-offset-2 ring-offset-background aria-pressed:ring-2 aria-pressed:ring-foreground"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            aria-label={t("accentPicker")}
            value={HEX.test(deck.accent) ? deck.accent : "#000000"}
            onChange={(e) => set("accent", e.target.value)}
            className="h-10 w-12 cursor-pointer rounded-md border border-input/60 bg-background p-1"
          />
          <input
            aria-label={t("accentHex")}
            className={inputClass}
            value={deck.accent}
            onChange={(e) => set("accent", e.target.value.trim())}
          />
        </div>
        {warning && (
          <p className="text-xs font-medium text-destructive">
            {t("accentWarning")}
          </p>
        )}
        {error("accent")}
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1.5 flex w-full items-center justify-between text-sm font-medium">
          {t("field.event")}
          <Switch
            aria-label={t("field.event")}
            checked={!!deck.event}
            onCheckedChange={(checked) =>
              set(
                "event",
                checked
                  ? {
                      name: deck.title,
                      date: new Date().toISOString().slice(0, 10),
                    }
                  : undefined,
                true,
              )
            }
          />
        </legend>
        {deck.event && (
          <>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="editor-field-8" className="text-sm">{t("field.eventName")}</label>
              <input id="editor-field-8"
                className={inputClass}
                value={deck.event.name}
                onChange={(e) =>
                  set("event", { ...deck.event!, name: e.target.value })
                }
              />
              {error("event.name")}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="editor-field-9" className="text-sm">{t("field.eventDate")}</label>
              <input id="editor-field-9"
                type="date"
                className={inputClass}
                value={deck.event.date}
                onChange={(e) =>
                  set("event", { ...deck.event!, date: e.target.value })
                }
              />
              {error("event.date")}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="editor-field-10" className="text-sm">
                {t("field.eventUrl")} ({t("optional")})
              </label>
              <input id="editor-field-10"
                className={inputClass}
                value={deck.event.url ?? ""}
                onChange={(e) =>
                  set(
                    "event",
                    setField(deck.event!, "url", e.target.value, true),
                  )
                }
              />
              {error("event.url")}
            </div>
          </>
        )}
      </fieldset>

      <div className="mt-4 flex flex-col gap-2 border-t pt-5">
        <p className="text-sm font-medium text-destructive">
          {t("dangerZone")}
        </p>
        {confirmDelete ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void deleteDeckAction(deck.slug)}
              className="min-h-10 rounded-full bg-destructive px-4 text-sm font-medium text-destructive-foreground"
            >
              {t("deleteDeckConfirm")}
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="min-h-10 rounded-full px-4 text-sm font-medium hover:bg-foreground/[0.07]"
            >
              {t("cancel")}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="min-h-10 self-start rounded-full px-4 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            {t("deleteDeck")}
          </button>
        )}
      </div>
    </div>
  );
}
