import { test, expect } from "@playwright/test";
import { open } from "../support/setup";

test.describe("Home · skills", () => {
  test.describe("without motion", () => {
    test.use({ contextOptions: { reducedMotion: "reduce" } });

    test.beforeEach(async ({ page }) => {
      await open(page);
    });

    test("shows the stack in two rows and a category filter", async ({
      page,
    }) => {
      const section = page.locator("section#craft");
      await expect(
        section.getByRole("heading", {
          level: 2,
          name: "The stack I reach for",
        }),
      ).toBeVisible();
      await expect(
        section.getByRole("list", { name: "The stack I reach for" }),
      ).toHaveCount(2);
      await expect(
        section.getByRole("link", { name: "View All Skills" }),
      ).toHaveAttribute("href", "/skills");
    });

    test("a category toggles on and off", async ({ page }) => {
      const filter = page
        .locator("section#craft")
        .getByRole("group", { name: "Filter by area" });
      const frontend = filter.getByRole("button", { name: "Frontend" });
      await frontend.click();
      await expect(frontend).toHaveAttribute("aria-pressed", "true");
      await frontend.click();
      await expect(frontend).toHaveAttribute("aria-pressed", "false");
    });

    test("with reduced motion the rows stand still and the pause button is not offered", async ({
      page,
    }) => {
      await expect(
        page.getByRole("button", { name: "Pause the moving rows" }),
      ).toBeHidden();
    });
  });

  test.describe("with motion", () => {
    test.use({ contextOptions: { reducedMotion: "no-preference" } });

    test("the pause button stops the rows (WCAG 2.2.2)", async ({ page }) => {
      await open(page);
      const pause = page.getByRole("button", { name: "Pause the moving rows" });
      const track = page.locator("section#craft .marquee-track").first();
      await expect(track).toHaveCSS("animation-play-state", "running");
      await pause.click();
      await expect(pause).toHaveAttribute("aria-pressed", "true");
      await expect(track).toHaveCSS("animation-play-state", "paused");
    });
  });
});
