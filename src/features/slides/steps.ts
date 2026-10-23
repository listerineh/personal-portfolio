import type { Slide } from './schema';

/** How many build steps a slide has: one per list item when `build` is on, otherwise none. */
export function stepCount(slide: Slide): number {
  if (!slide.build) return 0;
  switch (slide.layout) {
    case "bullets":
      return slide.items.length;
    case "icons-grid":
      return slide.items.length;
    case "stats":
      return slide.stats.length;
    case "two-column":
      return slide.columns.length;
    default:
      return 0;
  }
}
