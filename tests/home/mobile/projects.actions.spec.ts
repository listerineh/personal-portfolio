import { test, expect } from '@playwright/test';

test.describe('Home - Projects Section - User Actions - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('section#projects').scrollIntoViewIfNeeded();
  });

  test('should have clickable project cards on mobile', async ({ page }) => {
    const card = page.locator('section#projects article a').first();
    await expect(card).toBeVisible();
  });

  test('should have project cards with hover effects on mobile', async ({ page }) => {
    const card = page.locator('section#projects article').first();
    const classList = await card.evaluate(el => el.className);
    expect(classList).toContain('group');
  });

  test('should navigate to project detail page on mobile', async ({ page }) => {
    const link = page.locator('section#projects article a').first();
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('/projects/');
  });

  test('should have sufficient touch target size for project cards on mobile', async ({ page }) => {
    const card = page.locator('section#projects article').first();
    const boundingBox = await card.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(300);
    expect(boundingBox?.width).toBeGreaterThanOrEqual(300);
  });
});
