"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { refreshRoute, useRoute } from "./route-store";

interface RouteRailProps {
  className?: string;
}

/**
 * The visitor route: one continuous line along the floor of the site.
 * The amber segment is how far you have walked; ticks mark the rooms.
 * Decorative: the header names the current room as text.
 */
export function RouteRail({ className }: RouteRailProps) {
  const pathname = usePathname();
  const { stops, progress } = useRoute();

  useEffect(() => {
    refreshRoute(pathname);
  }, [pathname]);

  if (stops.length < 2) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 h-1 bg-foreground/10 print:hidden",
        className,
      )}
    >
      <div
        className="absolute inset-y-0 left-0 w-full origin-left bg-primary"
        style={{ transform: `scaleX(${progress})` }}
      />
      {stops.map((stop) => (
        <span
          key={stop.id}
          className="absolute -top-1 h-2 w-px bg-foreground/40"
          style={{ left: `${stop.at * 100}%` }}
        />
      ))}
    </div>
  );
}
