import { test, expect, type Page } from "@playwright/test";
import { open } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

test.describe("Home · hero", () => {
  test.beforeEach(async ({ page }) => {
    await open(page);
  });

  test("shows the name and what gets built", async ({ page }) => {
    const hero = page.locator("section#hero");
    const title = hero.getByRole("heading", { level: 1 });
    await expect(title).toContainText("Sebastian Alvarez");
    // The rotating words are decorative; the full sentence is there for assistive tech.
    await expect(hero.locator(".sr-only").filter({ hasText: "I build AI agents" })).toHaveCount(1);
    await expect(
      hero.getByText("Full-Stack Engineer · Applied AI"),
    ).toBeVisible();
  });

  test("offers the work, contact and the CV", async ({ page }) => {
    const hero = page.locator("section#hero");
    await expect(
      hero.getByRole("link", { name: "Explore my work" }),
    ).toHaveAttribute("href", "#work");
    await expect(
      hero.getByRole("link", { name: "Get in Touch" }),
    ).toHaveAttribute("href", "/contact");
    await expect(
      hero.getByRole("link", { name: "Scroll to my experience" }),
    ).toHaveAttribute("href", "#career");
  });

  test('"Explore my work" brings the projects section into view', async ({
    page,
  }) => {
    await page
      .locator("section#hero")
      .getByRole("link", { name: "Explore my work" })
      .click();
    await expect(page.locator("section#work")).toBeInViewport();
  });

  test("downloads the CV", async ({ page }) => {
    const download = page.waitForEvent("download");
    await page
      .locator("section#hero")
      .getByRole("button", { name: "Download CV" })
      .click();
    expect((await download).suggestedFilename()).toBe(
      "CV_SebastianAlvarez_EN.pdf",
    );
  });

  test("with reduced motion nothing moves, so no pause button is offered", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: "Pause the animations" }),
    ).toBeHidden();
  });

  test.describe("with motion", () => {
    test.use({ contextOptions: { reducedMotion: "no-preference" } });

    // Both are decorative (aria-hidden), so read what is on screen: the word at full opacity, the card on top.
    const frame = (page: Page) =>
      page.locator("section#hero").evaluate((hero) => {
        const words = [
          ...hero.querySelectorAll<HTMLElement>("h1 [aria-hidden] > span"),
        ];
        const cards = [
          ...hero.querySelectorAll<HTMLElement>("[data-card-stack] > div"),
        ];
        return {
          word: words.findIndex((word) => word.style.opacity === "1"),
          front: cards.findIndex((card) => card.style.zIndex === "3"),
        };
      });

    // Advances the fake clock until both the word and the front card have changed (the page may still be hydrating).
    const expectMoving = async (page: Page) => {
      const start = await frame(page);
      const words = new Set([start.word]);
      const fronts = new Set([start.front]);
      await expect(async () => {
        await page.clock.runFor(1_000);
        const now = await frame(page);
        words.add(now.word);
        fronts.add(now.front);
        expect(words.size).toBeGreaterThan(1);
        expect(fronts.size).toBeGreaterThan(1);
      }).toPass({ timeout: 20_000 });
    };

    test("the pause button stops the deck, the words and the loops (WCAG 2.2.2)", async ({
      page,
    }) => {
      await page.clock.install();
      await open(page);
      const hero = page.locator("section#hero");
      const pause = hero.getByRole("button", { name: "Pause the animations" });
      const halo = hero.locator(".ambient-halo-a");

      // Moving on its own until paused.
      await expectMoving(page);
      await expect(halo).toHaveCSS("animation-play-state", "running");

      await pause.click();
      await expect(pause).toHaveAttribute("aria-pressed", "true");
      await expect(halo).toHaveCSS("animation-play-state", "paused");
      // Let a deal already under way settle, then nothing changes however long it waits.
      await page.clock.runFor(1_000);
      const held = await frame(page);
      await page.clock.runFor(15_000);
      expect(await frame(page)).toEqual(held);

      // Pressing again lets it move.
      await pause.click();
      await expect(pause).toHaveAttribute("aria-pressed", "false");
      await expect(halo).toHaveCSS("animation-play-state", "running");
      await expectMoving(page);
    });
  });
});
