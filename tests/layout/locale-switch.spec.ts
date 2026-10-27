import { test, expect } from "@playwright/test";
import { open } from "../support/setup";

// Switching language re-renders the [locale] layout. <html> must keep what the pre-paint script set (the theme and
// js-motion, which gates every animation): React used to overwrite its class with the server's.
test.use({ contextOptions: { reducedMotion: "no-preference" } });

test("switching language keeps the dark theme and the animations", async ({
  page,
  isMobile,
}) => {
  await page
    .context()
    .addCookies([
      {
        name: "theme",
        value: "dark",
        url: test.info().project.use.baseURL ?? "http://localhost:3001",
      },
    ]);
  await open(page, "/blog");
  const html = page.locator("html");
  await expect(html).toHaveClass(/\bdark\b/);
  await expect(html).toHaveClass(/\bjs-motion\b/);

  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("button", { name: "Español" }).first().click();
  if (isMobile) await page.keyboard.press("Escape");

  await expect(html).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Blog de Desarrollo/,
  );
  await expect(html).toHaveClass(/\bdark\b/);
  await expect(html).toHaveClass(/\bjs-motion\b/);
});
