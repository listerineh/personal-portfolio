"use client";

import { useSyncExternalStore } from "react";

export type RouteStop = { id: string; number: string; name: string; at: number };
export type RouteState = {
  stops: RouteStop[];
  current: RouteStop | null;
  progress: number;
};

const EMPTY: RouteState = { stops: [], current: null, progress: 0 };

let state: RouteState = EMPTY;
const listeners = new Set<() => void>();

function emit(next: RouteState) {
  if (
    next.current?.id === state.current?.id &&
    next.stops.length === state.stops.length &&
    Math.abs(next.progress - state.progress) < 0.002
  ) {
    return;
  }
  state = next;
  listeners.forEach((listener) => listener());
}

let frame = 0;
let observedPath = "";

function measure() {
  frame = 0;
  const rooms = Array.from(
    document.querySelectorAll<HTMLElement>("[data-room]"),
  );
  const doc = document.documentElement;
  const max = Math.max(1, doc.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / max));
  const stops = rooms.map((el) => ({
    id: el.id,
    number: el.dataset.room ?? "",
    name: el.dataset.roomName ?? "",
    at: Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4) / max)),
  }));
  // The current room is the last one whose top has crossed 40% of the viewport.
  const line = window.innerHeight * 0.4;
  let current: RouteStop | null = null;
  for (let index = 0; index < rooms.length; index++) {
    if (rooms[index].getBoundingClientRect().top <= line) current = stops[index];
  }
  emit({ stops, current, progress });
}

function schedule() {
  if (!frame) frame = window.requestAnimationFrame(measure);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

/** Re-scan rooms after a client navigation. */
export function refreshRoute(pathname: string) {
  if (typeof window === "undefined" || pathname === observedPath) return;
  observedPath = pathname;
  schedule();
}

export function useRoute(): RouteState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => EMPTY,
  );
}
