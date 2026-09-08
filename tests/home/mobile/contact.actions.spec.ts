import { test, expect } from '@playwright/test';

test.describe('Home - Contact Section - User Actions - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('section#contact').scrollIntoViewIfNeeded();
  });

  test('should navigate to contact page when CTA is clicked on mobile', async ({ page }) => {
    const button = page.locator('section#contact a[href="/contact"]');
    await button.click();
    await page.waitForURL('/contact');
    expect(page.url()).toContain('/contact');
  });
});
