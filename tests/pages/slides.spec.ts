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

  test("the back button returns to the talks listing", async ({ page }) => {
    await open(page, DECK);
    await expect(page.getByRole("link", { name: "Back to talks" })).toHaveAttribute("href", "/slides");
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
    await expect(page.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
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
    // Next's route announcer is also role=alert, so look for the message itself.
    await expect(page.getByRole("alert").filter({ hasText: /\S/ })).toHaveText("This GitHub account can't manage slides.");
  });
});

test.describe("Talks listing", () => {
  test("lists published talks or says there are none yet", async ({ page }) => {
    await open(page, "/slides");
    await expect(page.getByRole("heading", { level: 1, name: "Talks" })).toBeVisible();
    await expect(page).toHaveTitle(/^Talks ·/);
    const cards = page.locator('a[href^="/slides/"]');
    if ((await cards.count()) === 0) await expect(page.getByText("No talks published yet")).toBeVisible();
  });

  test("follows the site's metadata pattern, with its own share card and structured data", async ({ page }) => {
    await open(page, "/slides", "en", "domcontentloaded");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://listerineh.dev/slides");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Talks · Sebastian Alvarez");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(image).toBe("https://listerineh.dev/og/slides.png");
    const response = await page.request.get("/og/slides.png");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
    // Text filters skip <script> contents, so read every JSON-LD block and pick the collection.
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const data = blocks.map((block) => JSON.parse(block)).find((item) => item["@type"] === "CollectionPage");
    expect(data?.["@id"]).toBe("https://listerineh.dev/slides");

    await open(page, "/slides", "es", "domcontentloaded");
    await expect(page).toHaveTitle(/^Charlas ·/);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "es_ES");
  });

  test("a public deck has its own share card", async ({ page }) => {
    await open(page, DECK, "en", "domcontentloaded");
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(image).toMatch(/\/og\/slides\/test-presentation\.png\?v=\d+&lang=es$/);
    // The tag is absolute on the production host; fetch the same path from the server under test.
    const { pathname, search } = new URL(image!);
    const response = await page.request.get(pathname + search);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
  });
});

test.describe("Slides print and PDF", () => {
  test("the print page lays out every slide, fully built, one 1920×1080 page each", async ({ page }) => {
    await open(page, `${DECK}/print`, "en", "domcontentloaded");
    const pages = page.locator(".print-page");
    await expect(pages).toHaveCount(13);
    expect(await pages.first().evaluate((el) => [el.clientWidth, el.clientHeight])).toEqual([1920, 1080]);
    await expect(page.locator("[data-pending]")).toHaveCount(0);
    expect(await page.content()).not.toContain("Presentarse. Contar por qué");
  });

  test("the viewer offers the PDF of the current version", async ({ page }) => {
    await open(page, DECK);
    await expect(page.getByRole("link", { name: "Download PDF" })).toHaveAttribute("href", /\/slides\/test-presentation\/pdf\?v=\d+&lang=es$/);
  });
});
