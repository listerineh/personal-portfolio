import { test, type Page } from '@playwright/test';

export type Locale = 'en' | 'es';

const consent = JSON.stringify({ necessary: true, analytics: false, preferences: false, timestamp: 0 });

/**
 * Opens a page the way a returning visitor sees it: language chosen by cookie (the server renders from it) and the
 * cookie banner already answered, so it never covers the controls under test.
 */
export async function open(page: Page, path = '/', locale: Locale = 'en') {
  const url = test.info().project.use.baseURL ?? 'http://localhost:3001';
  await page.context().addCookies([{ name: 'NEXT_LOCALE', value: locale, url }]);
  await page.addInitScript((value) => {
    document.cookie = `cookie-consent=${value}; path=/`;
  }, consent);
  return page.goto(path);
}
