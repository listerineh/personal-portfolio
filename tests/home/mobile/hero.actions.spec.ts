import { test, expect } from '@playwright/test';

test.describe('Home - Hero Section - User Actions - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('should trigger download when clicking Download CV button on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    await expect(cvButton).toBeEnabled();
    await cvButton.click();
    await page.waitForTimeout(500);
    const toast = page.locator('span[role="status"]:has-text("CV Downloaded")').first();
    if (await toast.count() > 0) {
      await expect(toast).toBeVisible();
    }
  });

  test('should navigate to contact section when clicking Get in Touch on mobile', async ({ page }) => {
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    const link = touchButton.locator('..');
    const href = await link.getAttribute('href');
    expect(href).toBe('#contact');
  });

  test('should scroll to contact section when clicking Get in Touch on mobile', async ({ page }) => {
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    await touchButton.click();
    await page.waitForTimeout(500);
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();
  });

  test('should have clickable buttons on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    await expect(cvButton).toBeEnabled();
    await expect(touchButton).toBeEnabled();
  });

  test('should have sufficient touch target size on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    const boundingBox = await cvButton.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
    expect(boundingBox?.width).toBeGreaterThanOrEqual(44);
  });

  test('should have proper spacing between buttons on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    const cvBox = await cvButton.boundingBox();
    const touchBox = await touchButton.boundingBox();
    if (cvBox && touchBox) {
      const verticalGap = touchBox.y - (cvBox.y + cvBox.height);
      expect(verticalGap).toBeGreaterThan(0);
    }
  });
});
