import { test, expect } from "@playwright/test";
import { open } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

const DECK = "/slides/test-presentation";
const counter = (page: import("@playwright/test").Page) => page.locator("footer [aria-live] [aria-hidden]");

test.describe("Slides viewer", () => {
  test("opens on the first slide with the deck's title", async ({ page }) => {
    await open(page, DECK);
    await expect(page).toHaveTitle(/^Slides en listerineh\.dev ·/);
    await expect(page.getByRole("heading", { level: 1, name: "Slides en listerineh.dev" }).first()).toBeVisible();
    await expect(counter(page)).toHaveText("1 / 12");
    await expect(page).toHaveURL(/#\/1$/);
  });

  test("arrows move between slides and the hash follows", async ({ page }) => {
    await open(page, DECK);
    await page.keyboard.press("ArrowRight");
    await expect(counter(page)).toHaveText("2 / 12");
    await expect(page).toHaveURL(/#\/2$/);
    await page.keyboard.press("ArrowLeft");
    await expect(counter(page)).toHaveText("1 / 12");
    await page.keyboard.press("End");
    await expect(counter(page)).toHaveText("12 / 12");
    await expect(page.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  test("a deep link opens that slide, and editing the hash moves", async ({ page }) => {
    await open(page, `${DECK}#/10`);
    await expect(counter(page)).toHaveText("10 / 12");
    await expect(page.locator(".slide-canvas")).toHaveAttribute("data-layout", "code");
    await page.evaluate(() => (window.location.hash = "#/3"));
    await expect(counter(page)).toHaveText("3 / 12");
  });

  test("build steps reveal one item per step before the next slide", async ({ page }) => {
    await open(page, `${DECK}#/4`);
    const items = page.locator(".slide-canvas li");
    await expect(items).toHaveCount(4);
    await expect(page.locator(".slide-canvas [data-pending]")).toHaveCount(4);
    for (let pending = 3; pending >= 0; pending--) {
      await page.keyboard.press("ArrowRight");
      await expect(page.locator(".slide-canvas [data-pending]")).toHaveCount(pending);
      await expect(counter(page)).toHaveText("4 / 12");
    }
    await page.keyboard.press("ArrowRight");
    await expect(counter(page)).toHaveText("5 / 12");
    // Back lands on the previous slide fully built.
    await page.keyboard.press("ArrowLeft");
    await expect(counter(page)).toHaveText("4 / 12");
    await expect(page.locator(".slide-canvas [data-pending]")).toHaveCount(0);
  });

  test("the deck carries its own accent and theme", async ({ page }) => {
    await open(page, DECK);
    const deck = page.locator(".deck");
    await expect(deck).toHaveAttribute("data-theme", "light");
    expect(await deck.evaluate((el) => getComputedStyle(el).getPropertyValue("--primary").trim())).toBe("37 99 235");
    await page.getByRole("button", { name: "Dark slides" }).click();
    await expect(deck).toHaveAttribute("data-theme", "dark");
  });

  test("speaker notes never reach the audience", async ({ page }) => {
    await open(page, DECK);
    const html = await page.content();
    expect(html).not.toContain("Presentarse. Contar por qué");
  });

  test("Spanish chrome", async ({ page }) => {
    await open(page, DECK, "es");
    await expect(page.getByRole("button", { name: "Siguiente" })).toBeVisible();
  });

  test("an unknown deck is a 404", async ({ page }) => {
    const response = await open(page, "/slides/does-not-exist", "en", "domcontentloaded");
    expect(response?.status()).toBe(404);
  });
});
