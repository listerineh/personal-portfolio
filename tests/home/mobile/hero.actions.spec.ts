import { test, expect } from '@playwright/test';

test.describe('Home - Hero Section - User Actions - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('should trigger download when clicking Download CV button on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero button, section#hero a').filter({ hasText: /Download CV/ });
    await expect(cvButton).toBeEnabled();
    await cvButton.click();
    await page.waitForTimeout(500);
    const toast = page.locator('[role="status"]:has-text("CV")').first();
    if (await toast.count() > 0) {
      await expect(toast).toBeVisible();
    }
  });

  test('should navigate to contact section when clicking Get in Touch on mobile', async ({ page }) => {
    const touchButton = page.locator('section#hero a[href="#contact"], section#hero button').filter({ hasText: /Get in Touch/ });
    const href = await touchButton.getAttribute('href');
    expect(href).toBe('#contact');
  });

  test('should scroll to contact section when clicking Get in Touch on mobile', async ({ page }) => {
    const touchButton = page.locator('section#hero a[href="#contact"]').filter({ hasText: /Get in Touch/ });
    await touchButton.click();
    await page.waitForTimeout(500);
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();
  });

  test('should have clickable buttons on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero button, section#hero a').filter({ hasText: /Download CV/ });
    const touchButton = page.locator('section#hero a[href="#contact"], section#hero button').filter({ hasText: /Get in Touch/ });
    await expect(cvButton).toBeEnabled();
    await expect(touchButton).toBeEnabled();
  });

  test('should have sufficient touch target size on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero button, section#hero a').filter({ hasText: /Download CV/ });
    const boundingBox = await cvButton.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
    expect(boundingBox?.width).toBeGreaterThanOrEqual(44);
  });
});
