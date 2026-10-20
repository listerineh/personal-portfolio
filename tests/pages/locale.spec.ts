import { test, expect, type Page } from "@playwright/test";
import { fromAcceptLanguage } from "../../src/i18n/locale";

// A first visit (no NEXT_LOCALE cookie) follows the browser's language; a choice made with the switcher wins.

const firstVisit = (page: Page) => page.goto("/", { waitUntil: "domcontentloaded" });
const scrollCue = (page: Page) => page.locator("section#hero a[href='#career']");

test.describe("First visit in a Spanish browser", () => {
  test.use({ locale: "es-EC" });

  test("gets the site in Spanish", async ({ page }) => {
    await firstVisit(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(scrollCue(page)).toHaveAttribute("aria-label", "Bajar a mi experiencia");
  });

  test("keeps English once the visitor chose it", async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: "NEXT_LOCALE", value: "en", url: baseURL! }]);
    await firstVisit(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});

test.describe("First visit in other browsers", () => {
  test.use({ locale: "fr-FR" });

  test("a language the site doesn't have falls back to English", async ({ page }) => {
    await firstVisit(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(scrollCue(page)).toHaveAttribute("aria-label", "Scroll to my experience");
  });
});

test("Accept-Language is read by quality, then order", () => {
  expect(fromAcceptLanguage("es-EC,es;q=0.9,en;q=0.8")).toBe("es");
  expect(fromAcceptLanguage("en-US,en;q=0.9,es;q=0.8")).toBe("en");
  expect(fromAcceptLanguage("fr-FR,fr;q=0.9,es;q=0.7,en;q=0.5")).toBe("es");
  expect(fromAcceptLanguage("de;q=1,en;q=0")).toBeNull();
  expect(fromAcceptLanguage("*")).toBeNull();
  expect(fromAcceptLanguage(null)).toBeNull();
});
