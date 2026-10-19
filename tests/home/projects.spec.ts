import { test, expect } from "@playwright/test";
import { open } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

test.describe("Home · projects", () => {
  test.beforeEach(async ({ page }) => {
    await open(page);
  });

  test("shows the projects in a carousel", async ({ page }) => {
    const section = page.locator("section#work");
    await expect(
      section.getByRole("heading", { level: 2, name: "Built and shipped" }),
    ).toBeVisible();
    const carousel = section.getByRole("region", {
      name: "Projects, one at a time",
    });
    const links = carousel.getByRole("link");
    expect(await links.count()).toBeGreaterThanOrEqual(4);
    await expect(links.first()).toHaveAttribute(
      "href",
      /^\/projects\/[a-z0-9-]+$/,
    );
    await expect(
      section.getByRole("link", { name: "View All Projects" }),
    ).toHaveAttribute("href", "/projects");
  });

  test("next and previous move the carousel", async ({ page }) => {
    const section = page.locator("section#work");
    const previous = section.getByRole("button", { name: "Previous" });
    const next = section.getByRole("button", { name: "Next" });
    await expect(previous).toBeDisabled();
    await next.click();
    await expect(previous).toBeEnabled();
    await previous.click();
    await expect(previous).toBeDisabled();
  });

  test("a project card opens its page", async ({ page }) => {
    const first = page
      .locator("section#work")
      .getByRole("region")
      .getByRole("link")
      .first();
    const href = await first.getAttribute("href");
    await first.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
