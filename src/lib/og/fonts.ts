import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Geist as TTF (next/og can't read woff2). Loaded once per instance. Each route using it lists the files in
// next.config.ts (outputFileTracingIncludes).
let fonts: Promise<{ name: string; data: Buffer; weight: 500 | 600 | 700; style: 'normal' }[]> | undefined;

export function loadOgFonts() {
  fonts ??= Promise.all(
    ([['Geist-Medium.ttf', 500], ['Geist-SemiBold.ttf', 600], ['Geist-Bold.ttf', 700]] as const).map(
      async ([file, weight]) => ({
        name: 'Geist',
        data: await readFile(path.join(process.cwd(), 'src/assets/fonts', file)),
        weight,
        style: 'normal' as const,
      }),
    ),
  );
  return fonts;
}
