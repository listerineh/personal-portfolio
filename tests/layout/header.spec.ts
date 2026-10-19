import { test, expect } from "@playwright/test";
import { open } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

test.describe("Header", () => {
  test("desktop navigation marks the current page", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Phones use the menu sheet");
    await open(page, "/about");
    const nav = page.getByRole("navigation", { name: "Menu" });
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(
      nav.getByRole("link", { name: "Projects" }),
    ).not.toHaveAttribute("aria-current", "page");
  });

  test("phone menu opens, closes with Escape and gives focus back", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Desktop shows the links inline");
    await open(page);
    const toggle = page.getByRole("button", { name: "Menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    const sheet = page.getByRole("dialog", { name: "Menu" });
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole("link", { name: "Blog" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  });

  test("switching to Spanish translates the page, updates <html lang> and is remembered", async ({
    page,
    isMobile,
  }) => {
    await open(page);
    if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("button", { name: "Español" }).first().click();
    if (isMobile) await page.keyboard.press("Escape");

    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    const career = page
      .locator("section#career")
      .getByRole("heading", { level: 2 });
    await expect(career).not.toHaveText("Where I've worked");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(career).not.toHaveText("Where I've worked");
  });

  test("the theme toggle switches to dark", async ({ page }) => {
    await open(page);
    await page.getByRole("button", { name: /Toggle theme/ }).click();
    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  });
});
