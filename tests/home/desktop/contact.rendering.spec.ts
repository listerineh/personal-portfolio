import { test, expect } from '@playwright/test';

test.describe('Home - Contact Section - Rendering - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#contact').scrollIntoViewIfNeeded();
  });

  test('should render contact section', async ({ page }) => {
    const section = page.locator('section#contact');
    await expect(section).toBeVisible();
  });

  test('should display section title', async ({ page }) => {
    const title = page.locator('section#contact h2');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toMatch(/Work with me/i);
  });

  test('should display description text', async ({ page }) => {
    const description = page.locator('section#contact p:has-text("If you have a project")');
    await expect(description).toBeVisible();
  });

  test('should display call-to-action button', async ({ page }) => {
    const button = page.locator('section#contact a[href="/contact"]');
    await expect(button).toBeVisible();
    const buttonText = await button.textContent();
    expect(buttonText).toMatch(/Send a message/i);
  });
});
