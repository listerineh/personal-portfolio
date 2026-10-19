import { test, expect } from "@playwright/test";
import { open } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

test.describe("Home · latest articles and contact", () => {
  test.beforeEach(async ({ page }) => {
    await open(page);
  });

  test("shows the latest articles", async ({ page }) => {
    const section = page.locator("section#writing");
    await expect(
      section.getByRole("heading", { level: 2, name: "Latest articles" }),
    ).toBeVisible();
    const posts = section.locator('a[href^="/blog/"]');
    expect(await posts.count()).toBeGreaterThanOrEqual(3);
    await expect(
      section.getByRole("link", { name: "View All Posts" }),
    ).toHaveAttribute("href", "/blog");
  });

  test("ends with a way to get in touch", async ({ page }) => {
    const section = page.locator("section#contact");
    await expect(
      section.getByRole("heading", { level: 2, name: "Work with me" }),
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Send a message" }),
    ).toHaveAttribute("href", "/contact");
    await expect(section.locator('a[href^="mailto:"]')).toBeVisible();
  });
});
