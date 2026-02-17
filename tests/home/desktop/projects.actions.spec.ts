import { test, expect } from '@playwright/test';

test.describe('Home - Projects Section - User Actions - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#projects').scrollIntoViewIfNeeded();
  });

  test('should have clickable Live Demo buttons', async ({ page }) => {
    const liveLink = page.locator('section#projects a:has-text("Live Demo")').first();
    await expect(liveLink).toBeVisible();
  });

  test('should have clickable Source buttons', async ({ page }) => {
    const sourceLink = page.locator('section#projects a:has-text("Source")').first();
    await expect(sourceLink).toBeVisible();
  });

  test('should open Live Demo in new tab', async ({ page }) => {
    const liveLink = page.locator('section#projects a:has-text("Live Demo")').first();
    const target = await liveLink.getAttribute('target');
    expect(target).toBe('_blank');
  });

  test('should open Source in new tab', async ({ page }) => {
    const sourceLink = page.locator('section#projects a:has-text("Source")').first();
    const target = await sourceLink.getAttribute('target');
    expect(target).toBe('_blank');
  });

  test('should have proper rel attribute on external links', async ({ page }) => {
    const liveLink = page.locator('section#projects a:has-text("Live Demo")').first();
    const rel = await liveLink.getAttribute('rel');
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  });

  test('should have project cards with hover effects', async ({ page }) => {
    const card = page.locator('section#projects').locator('div[class*="group"]').first();
    const classList = await card.evaluate(el => el.className);
    expect(classList).toContain('group');
  });

  test('should have project images with scale effect on hover', async ({ page }) => {
    const image = page.locator('section#projects .project-image').first();
    const classList = await image.evaluate(el => el.className);
    expect(classList).toContain('group-hover:scale-110');
  });

  test('should have project cards with shadow effect on hover', async ({ page }) => {
    const card = page.locator('section#projects').locator('[class*="bg-card"]').first();
    const classList = await card.evaluate(el => el.className);
    expect(classList).toContain('hover:shadow-md');
  });
});
