import { test, expect } from "@playwright/test";
import { open, type Locale } from "../support/setup";

// Prerendered pages must hydrate cleanly: a mismatch (React #418) makes React throw the server HTML away and render
// again, so anything typed or clicked in between is lost. A rendered path that differs between the prerender
// (/es/blog) and the browser (/blog) is the classic cause; see src/hooks/use-site-pathname.ts.
const paths = [
  "/",
  "/about",
  "/blog",
  "/blog/when-ai-can-clone-your-app",
  "/projects",
  "/projects/kairo",
  "/skills",
  "/contact",
  "/why",
  "/slides",
];

// The browser runs where most readers are (Ecuador, UTC-5) while CI and Vercel render in UTC, so a date formatted in
// local time shows up as a mismatch here too.
test.use({ timezoneId: "America/Guayaquil" });

test.describe("Hydration", () => {
  for (const locale of ["en", "es"] as Locale[]) {
    for (const path of paths) {
      test(`${path} (${locale}) hydrates without errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await open(page, path, locale);
        await page
          .waitForLoadState("networkidle", { timeout: 5_000 })
          .catch(() => {});
        expect(errors).toEqual([]);
      });
    }
  }
});
