import { test, expect } from "@playwright/test";
import { open } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

test.describe("Home · career", () => {
  test.beforeEach(async ({ page }) => {
    await open(page);
  });

  test("lists every role as tabs with the first one open", async ({ page }) => {
    const section = page.locator("section#career");
    await expect(
      section.getByRole("heading", { level: 2, name: "Where I've worked" }),
    ).toBeVisible();
    const tabs = section
      .getByRole("tablist", { name: "Roles" })
      .getByRole("tab");
    expect(await tabs.count()).toBeGreaterThanOrEqual(5);
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
    await expect(section.getByRole("tabpanel")).toContainText(
      "Senior Software Engineer",
    );
  });

  test("clicking a role shows its details", async ({ page }) => {
    const section = page.locator("section#career");
    const tab = section.getByRole("tab", { name: /Blue Express/ });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(section.getByRole("tabpanel")).toContainText("Blue Express");
  });

  test("arrow keys move between roles", async ({ page }) => {
    const tabs = page.locator("section#career").getByRole("tab");
    await tabs.first().focus();
    await page.keyboard.press("ArrowDown");
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
  });

  test("/experience redirects here", async ({ page }) => {
    await page.goto("/experience");
    await expect(page).toHaveURL(/\/#career$/);
  });
});
