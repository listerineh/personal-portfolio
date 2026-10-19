import { test, expect } from "@playwright/test";
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
});
