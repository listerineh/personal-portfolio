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
    await expect(counter(page)).toHaveText("1 / 13");
    await expect(page).toHaveURL(/#\/1$/);
  });

  test("arrows move between slides and the hash follows", async ({ page }) => {
    await open(page, DECK);
    await page.keyboard.press("ArrowRight");
    await expect(counter(page)).toHaveText("2 / 13");
    await expect(page).toHaveURL(/#\/2$/);
    await page.keyboard.press("ArrowLeft");
    await expect(counter(page)).toHaveText("1 / 13");
    await page.keyboard.press("End");
    await expect(counter(page)).toHaveText("13 / 13");
    await expect(page.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  test("a deep link opens that slide, and editing the hash moves", async ({ page }) => {
    await open(page, `${DECK}#/11`);
    await expect(counter(page)).toHaveText("11 / 13");
    await expect(page.locator(".slide-canvas")).toHaveAttribute("data-layout", "code");
    await page.evaluate(() => (window.location.hash = "#/3"));
    await expect(counter(page)).toHaveText("3 / 13");
  });

  test("build steps reveal one item per step before the next slide", async ({ page }) => {
    await open(page, `${DECK}#/5`);
    const items = page.locator(".slide-canvas li");
    await expect(items).toHaveCount(4);
    await expect(page.locator(".slide-canvas [data-pending]")).toHaveCount(4);
    for (let pending = 3; pending >= 0; pending--) {
      await page.keyboard.press("ArrowRight");
      await expect(page.locator(".slide-canvas [data-pending]")).toHaveCount(pending);
      await expect(counter(page)).toHaveText("5 / 13");
    }
    await page.keyboard.press("ArrowRight");
    await expect(counter(page)).toHaveText("6 / 13");
    // Back lands on the previous slide fully built.
    await page.keyboard.press("ArrowLeft");
    await expect(counter(page)).toHaveText("5 / 13");
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

test.describe("Slides owner area", () => {
  test("anyone who isn't signed in only gets the GitHub sign-in", async ({ page }) => {
    await open(page, "/slides/manage");
    await expect(page.getByRole("button", { name: "Sign in with GitHub" })).toBeVisible();
    await expect(page.getByRole("list", { name: "Presentations" })).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("the editor sends anyone who isn't the owner to the sign-in", async ({ page }) => {
    await open(page, "/slides/test-presentation/edit");
    await expect(page).toHaveURL(/\/slides\/manage$/);
    await expect(page.getByRole("button", { name: "Sign in with GitHub" })).toBeVisible();
  });

  test("a refused account is told so", async ({ page }) => {
    await open(page, "/slides/manage?error=AccessDenied");
    await expect(page.getByRole("alert")).toHaveText("This GitHub account can't manage slides.");
  });
});
