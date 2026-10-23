"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";
import type { Deck } from "../schema";
import { stepCount } from "../steps";
import { accentStyle, type DeckTheme } from "../theme";
import { SlideCanvas, SlideFrame } from "../renderer/SlideView";

type Position = { index: number; step: number };
type Action =
  | { type: "next" }
  | { type: "prev" }
  | { type: "go"; index: number; step?: "start" | "end" };

const IDLE_AFTER = 2500;

/** `#/3` (1-based) ↔ slide index. */
function indexFromHash(hash: string, total: number): number | null {
  const match = /^#\/(\d+)$/.exec(hash);
  if (!match) return null;
  const n = Number(match[1]);
  return n >= 1 && n <= total ? n - 1 : null;
}

function isInteractive(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    !!target.closest(
      'a, button, input, textarea, select, iframe, [contenteditable="true"]',
    )
  );
}

export function DeckViewer({ deck }: { deck: Deck }) {
  const t = useTranslations("slides");
  const total = deck.slides.length;
  const steps = useMemo(() => deck.slides.map(stepCount), [deck.slides]);

  const reducer = useCallback(
    (position: Position, action: Action): Position => {
      const { index, step } = position;
      switch (action.type) {
        case "next":
          if (step < steps[index]) return { index, step: step + 1 };
          return index < total - 1 ? { index: index + 1, step: 0 } : position;
        case "prev":
          if (step > 0) return { index, step: step - 1 };
          // Going back lands on the previous slide fully built, as it was left.
          return index > 0
            ? { index: index - 1, step: steps[index - 1] }
            : position;
        case "go": {
          const target = Math.min(Math.max(action.index, 0), total - 1);
          return {
            index: target,
            step: action.step === "end" ? steps[target] : 0,
          };
        }
      }
    },
    [steps, total],
  );

  const [position, dispatch] = useReducer(reducer, { index: 0, step: 0 });
  const [theme, setTheme] = useState<DeckTheme>(deck.theme);
  const [fullscreen, setFullscreen] = useState(false);
  const [idle, setIdle] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const positionRef = useRef(position);
  useLayoutEffect(() => {
    positionRef.current = position;
  }, [position]);

  /** Moves, animating slide changes with a View Transition when the browser has one and motion is welcome. */
  const navigate = useCallback(
    (action: Action) => {
      const before = positionRef.current;
      const after = reducer(before, action);
      if (after.index === before.index && after.step === before.step) return;
      const changesSlide = after.index !== before.index;
      const doc = document as Document & {
        startViewTransition?: (update: () => void) => {
          ready: Promise<void>;
          finished: Promise<void>;
        };
      };
      if (
        !changesSlide ||
        !doc.startViewTransition ||
        document.visibilityState !== "visible" ||
        prefersReducedMotion()
      ) {
        dispatch(action);
        return;
      }
      document.documentElement.dataset.deckDir =
        after.index > before.index ? "next" : "prev";
      const transition = doc.startViewTransition(() =>
        flushSync(() => dispatch(action)),
      );
      // A newer keypress skips the running transition; the slide still updates, so the rejection is expected.
      transition.ready.catch(() => {});
      transition.finished.catch(() => {});
    },
    [reducer],
  );

  // Deep links: open at #/n, follow hash edits, and write the current slide back without adding history entries.
  useEffect(() => {
    const sync = () => {
      const index = indexFromHash(window.location.hash, total);
      if (index !== null && index !== positionRef.current.index)
        dispatch({ type: "go", index });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [total]);

  useEffect(() => {
    const hash = `#/${position.index + 1}`;
    if (window.location.hash !== hash)
      window.history.replaceState(null, "", hash);
  }, [position.index]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void root.current?.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onChange = () =>
      setFullscreen(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Keyboard: arrows, space, page keys and presenter clickers (which send PageUp/PageDown), Home/End, F.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (
        isInteractive(event.target) &&
        (event.key === " " || event.key === "Enter")
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('input, textarea, [contenteditable="true"]')
      )
        return;
      const actions: Record<string, () => void> = {
        ArrowRight: () => navigate({ type: "next" }),
        ArrowDown: () => navigate({ type: "next" }),
        PageDown: () => navigate({ type: "next" }),
        " ": () =>
          event.shiftKey
            ? navigate({ type: "prev" })
            : navigate({ type: "next" }),
        ArrowLeft: () => navigate({ type: "prev" }),
        ArrowUp: () => navigate({ type: "prev" }),
        PageUp: () => navigate({ type: "prev" }),
        Home: () => navigate({ type: "go", index: 0 }),
        End: () => navigate({ type: "go", index: total - 1, step: "end" }),
        f: toggleFullscreen,
        F: toggleFullscreen,
      };
      const run = actions[event.key];
      if (!run) return;
      event.preventDefault();
      run();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, toggleFullscreen, total]);

  // Full screen: the chrome fades away while the pointer rests, and comes back when it moves.
  useEffect(() => {
    if (!fullscreen) return;
    let timer = window.setTimeout(() => setIdle(true), IDLE_AFTER);
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), IDLE_AFTER);
    };
    window.addEventListener("pointermove", wake);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", wake);
    };
  }, [fullscreen]);

  // Touch and click on the stage: swipe either way, or tap the left third to go back and elsewhere to advance.
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (event: React.PointerEvent) => {
    pointer.current = isInteractive(event.target)
      ? null
      : { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: React.PointerEvent) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start || window.getSelection()?.toString()) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      navigate({ type: dx < 0 ? "next" : "prev" });
      return;
    }
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      navigate({ type: event.clientX - left < width / 3 ? "prev" : "next" });
    }
  };

  const slide = deck.slides[position.index];
  const atStart = position.index === 0 && position.step === 0;
  const atEnd =
    position.index === total - 1 && position.step === steps[total - 1];
  const progress = total > 1 ? position.index / (total - 1) : 1;

  return (
    <div
      ref={root}
      lang={deck.lang}
      data-theme={theme}
      data-idle={fullscreen && idle ? "" : undefined}
      style={accentStyle(deck.accent, theme)}
      className="deck fixed inset-0 flex flex-col"
    >
      <header className="deck-chrome flex h-16 shrink-0 items-center gap-4 px-gutter">
        <Link
          href="/"
          aria-label={t("back")}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground transition-colors duration-snap ease-snap hover:bg-foreground/[0.07] motion-reduce:transition-none"
        >
          <ArrowLeft aria-hidden="true" className="h-5 w-5" />
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-[0.9375rem] font-semibold tracking-[-0.01em]">
            {deck.title}
          </h1>
          {deck.event && (
            <p className="text-meta truncate text-muted-foreground">
              {deck.event.name}
            </p>
          )}
        </div>
      </header>

      <main
        className={cn(
          "relative min-h-0 flex-1 touch-pan-y select-none",
          fullscreen ? "p-0" : "px-gutter pb-2",
        )}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        aria-roledescription={t("roleDeck")}
        aria-label={deck.title}
      >
        <SlideFrame fit="contain" bare={fullscreen}>
          <div
            key={slide.id}
            role="group"
            aria-roledescription={t("roleSlide")}
            aria-label={t("slideOf", { current: position.index + 1, total })}
          >
            <SlideCanvas
              slide={slide}
              lang={deck.lang}
              state={{
                active: true,
                still: false,
                step: position.step,
                deckTitle: deck.title,
                index: position.index,
                total,
              }}
            />
          </div>
        </SlideFrame>
      </main>

      <footer className="deck-chrome flex h-[72px] shrink-0 items-center gap-3 px-gutter">
        <div className="flex items-center gap-1">
          <ChromeButton
            label={t("previous")}
            onClick={() => navigate({ type: "prev" })}
            disabled={atStart}
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </ChromeButton>
          <ChromeButton
            label={t("next")}
            onClick={() => navigate({ type: "next" })}
            disabled={atEnd}
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </ChromeButton>
        </div>
        <p
          className="text-meta w-16 shrink-0 tabular-nums text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="sr-only">
            {t("slideOf", { current: position.index + 1, total })}
          </span>
          <span aria-hidden="true">
            {position.index + 1} / {total}
          </span>
        </p>
        <div
          className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/[0.08]"
          role="progressbar"
          aria-label={t("progress")}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={position.index + 1}
        >
          <div
            className="h-full origin-left rounded-full bg-primary transition-transform duration-glide ease-glide motion-reduce:transition-none"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
        <div className="flex items-center gap-1">
          <ChromeButton
            label={theme === "dark" ? t("lightTheme") : t("darkTheme")}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Moon aria-hidden="true" className="h-5 w-5" />
            )}
          </ChromeButton>
          <ChromeButton
            label={fullscreen ? t("exitFullscreen") : t("fullscreen")}
            onClick={toggleFullscreen}
          >
            {fullscreen ? (
              <Minimize aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Maximize aria-hidden="true" className="h-5 w-5" />
            )}
          </ChromeButton>
        </div>
      </footer>
    </div>
  );
}

function ChromeButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-[background-color,transform] duration-snap ease-snap hover:bg-foreground/[0.07] active:scale-90 disabled:opacity-35 disabled:hover:bg-transparent motion-reduce:transition-none"
    >
      {children}
    </button>
  );
}
