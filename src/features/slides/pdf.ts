import type { Browser } from 'puppeteer-core';
import { getBucket } from '@/lib/server/firebase';

/**
 * Slide PDFs: headless Chrome prints /slides/<slug>/print (one 1920×1080 page per slide, vector text). On Vercel it
 * runs the Chromium build from @sparticuz/chromium; elsewhere it uses a local Chrome (CHROME_PATH, or the usual
 * macOS location). Each deck version is printed once and kept in Cloud Storage; the route also lets the CDN keep it.
 */

const MAC_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SERVERLESS = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

async function launch(): Promise<Browser> {
  const puppeteer = (await import('puppeteer-core')).default;
  const viewport = { width: 1920, height: 1080 };
  if (SERVERLESS) {
    const chromium = (await import('@sparticuz/chromium')).default;
    return puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true, defaultViewport: viewport });
  }
  return puppeteer.launch({ executablePath: process.env.CHROME_PATH || MAC_CHROME, headless: true, defaultViewport: viewport });
}

/** Prints a public deck from the given origin (this deployment) and returns the PDF bytes. */
export async function printDeckPdf(origin: string, slug: string): Promise<Buffer> {
  const browser = await launch();
  try {
    const page = await browser.newPage();
    // Answered consent, so the cookie banner never shows up (it is also hidden in print).
    await page.setCookie({
      name: 'cookie-consent',
      // Stored as raw JSON, the way src/lib/cookies.ts writes it.
      value: JSON.stringify({ necessary: true, analytics: false, preferences: false, timestamp: 0 }),
      url: origin,
    });
    const response = await page.goto(`${origin}/slides/${slug}/print`, { waitUntil: 'networkidle0', timeout: 30_000 });
    if (!response?.ok()) throw new Error(`Print page answered ${response?.status()}`);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images, (image) => (image.complete ? null : new Promise((done) => image.addEventListener('load', done, { once: true })))),
      );
    });
    const pdf = await page.pdf({ printBackground: true, preferCSSPageSize: true, timeout: 30_000 });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

const storedPath = (slug: string, version: number) => `slides/${slug}/pdf/v${version}.pdf`;

/** The PDF printed earlier for this deck version, if there is one (and Cloud Storage is configured). */
export async function readStoredPdf(slug: string, version: number): Promise<Buffer | null> {
  const bucket = getBucket();
  if (!bucket) return null;
  const file = bucket.file(storedPath(slug, version));
  const [exists] = await file.exists();
  if (!exists) return null;
  const [data] = await file.download();
  return data;
}

export async function storePdf(slug: string, version: number, pdf: Buffer): Promise<void> {
  const bucket = getBucket();
  if (!bucket) return;
  await bucket.file(storedPath(slug, version)).save(pdf, { resumable: false, contentType: 'application/pdf' });
}
