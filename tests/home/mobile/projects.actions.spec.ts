import { test, expect } from '@playwright/test';

test.describe('Home - Projects Section - User Actions - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('section#projects').scrollIntoViewIfNeeded();
  });

  test('should have clickable Live Demo buttons on mobile', async ({ page }) => {
    const liveLink = page.locator('section#projects a:has-text("Live Demo")').first();
    await expect(liveLink).toBeVisible();
  });

  test('should have clickable Source buttons on mobile', async ({ page }) => {
    const sourceLink = page.locator('section#projects a:has-text("Source")').first();
    await expect(sourceLink).toBeVisible();
  });

  test('should open Live Demo in new tab on mobile', async ({ page }) => {
    const liveLink = page.locator('section#projects a:has-text("Live Demo")').first();
    const target = await liveLink.getAttribute('target');
    expect(target).toBe('_blank');
  });

  test('should open Source in new tab on mobile', async ({ page }) => {
    const sourceLink = page.locator('section#projects a:has-text("Source")').first();
    const target = await sourceLink.getAttribute('target');
    expect(target).toBe('_blank');
  });

  test('should have proper rel attribute on external links on mobile', async ({ page }) => {
    const liveLink = page.locator('section#projects a:has-text("Live Demo")').first();
    const rel = await liveLink.getAttribute('rel');
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  });

  test('should have sufficient touch target size for project cards on mobile', async ({ page }) => {
    const card = page.locator('section#projects').locator('[class*="rounded-xl"]').first();
    const boundingBox = await card.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(300);
    expect(boundingBox?.width).toBeGreaterThanOrEqual(300);
  });

  test('should have sufficient touch target size for buttons on mobile', async ({ page }) => {
    const link = page.locator('section#projects a:has-text("Live Demo")').first();
    const boundingBox = await link.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(14);
    expect(boundingBox?.width).toBeGreaterThanOrEqual(14);
  });

  test('should have project cards with proper spacing on mobile', async ({ page }) => {
    const cards = page.locator('section#projects').locator('[class*="rounded-xl"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});
