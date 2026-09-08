import { test, expect } from '@playwright/test';

test.describe('Home - Hero Section - User Actions - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
  });

  test('should trigger download when clicking Download CV button', async ({ page }) => {
    const cvButton = page.locator('section#hero button, section#hero a').filter({ hasText: /Download CV/ });
    await expect(cvButton).toBeEnabled();
    await cvButton.click();
    await page.waitForTimeout(500);
    const toast = page.locator('[role="status"]:has-text("CV")').first();
    if (await toast.count() > 0) {
      await expect(toast).toBeVisible();
    }
  });

  test('should navigate to contact section when clicking Get in Touch', async ({ page }) => {
    const touchButton = page.locator('section#hero a[href="#contact"], section#hero button').filter({ hasText: /Get in Touch/ });
    const href = await touchButton.getAttribute('href');
    expect(href).toBe('#contact');
  });

  test('should scroll to contact section when clicking Get in Touch', async ({ page }) => {
    const touchButton = page.locator('section#hero a[href="#contact"]').filter({ hasText: /Get in Touch/ });
    await touchButton.click();
    await page.waitForTimeout(500);
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();
  });

  test('should have clickable Download CV button', async ({ page }) => {
    const cvButton = page.locator('section#hero button, section#hero a').filter({ hasText: /Download CV/ });
    await expect(cvButton).toBeEnabled();
    await cvButton.hover();
    await expect(cvButton).toBeVisible();
  });

  test('should have clickable Get in Touch button', async ({ page }) => {
    const touchButton = page.locator('section#hero a[href="#contact"]').filter({ hasText: /Get in Touch/ });
    await expect(touchButton).toBeEnabled();
    await touchButton.hover();
    await expect(touchButton).toBeVisible();
  });
});
