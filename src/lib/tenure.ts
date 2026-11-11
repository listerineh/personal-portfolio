/**
 * Years of experience are never typed by hand: they are counted from the month each thing started, so "6+" becomes
 * "7+" on its own. Copy refers to them with tokens ({careerYears}, {gdgYears}) that `withTenure` fills in.
 */

/** First professional role (AI Developer at CICTE – ESPE): July 2020. */
export const CAREER_START = { year: 2020, month: 7 } as const;
/** Organizer at Google Developer Groups Quito since April 2023. */
export const GDG_START = { year: 2023, month: 4 } as const;

/** Whole years completed since the start month (the month itself counts as started on its first day). */
export function yearsSince(
  start: { year: number; month: number },
  now: Date = new Date(),
): number {
  const months =
    (now.getUTCFullYear() - start.year) * 12 +
    (now.getUTCMonth() + 1 - start.month);
  return Math.max(0, Math.floor(months / 12));
}

export const careerYears = (now?: Date) => yearsSince(CAREER_START, now);
export const gdgYears = (now?: Date) => yearsSince(GDG_START, now);

/** Fills the tenure tokens in a string. */
export function fillTenure(text: string, now?: Date): string {
  return text
    .replaceAll("{careerYears}", String(careerYears(now)))
    .replaceAll("{gdgYears}", String(gdgYears(now)));
}

/**
 * Fills the tenure tokens across a whole messages object, before next-intl sees it (so they are plain text by the
 * time a string is formatted, and server and browser render the same words).
 */
export function withTenure<T>(messages: T, now?: Date): T {
  return JSON.parse(fillTenure(JSON.stringify(messages), now)) as T;
}
