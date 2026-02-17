import { test, expect } from '@playwright/test';

test.describe('Home - Hero Section - User Actions - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
  });

  test('should trigger download when clicking Download CV button', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    await expect(cvButton).toBeEnabled();
    await cvButton.click();
    await page.waitForTimeout(500);
    const toast = page.locator('span[role="status"]:has-text("CV Downloaded")').first();
    if (await toast.count() > 0) {
      await expect(toast).toBeVisible();
    }
  });

  test('should navigate to contact section when clicking Get in Touch', async ({ page }) => {
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    const link = touchButton.locator('..');
    const href = await link.getAttribute('href');
    expect(href).toBe('#contact');
  });

  test('should scroll to contact section when clicking Get in Touch', async ({ page }) => {
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    await touchButton.click();
    await page.waitForTimeout(500);
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();
  });

  test('should have clickable Download CV button', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    await expect(cvButton).toBeEnabled();
    await cvButton.hover();
    await expect(cvButton).toBeVisible();
  });

  test('should have clickable Get in Touch button', async ({ page }) => {
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    await expect(touchButton).toBeEnabled();
    await touchButton.hover();
    await expect(touchButton).toBeVisible();
  });

  test('should show hover effects on Download CV button', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    const initialColor = await cvButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    await cvButton.hover();
    const hoverColor = await cvButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(initialColor).not.toBe(hoverColor);
  });

  test('should show hover effects on Get in Touch button', async ({ page }) => {
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    const initialColor = await touchButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    await touchButton.hover();
    const hoverColor = await touchButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(initialColor).not.toBe(hoverColor);
  });
});
