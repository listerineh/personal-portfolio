import { test, expect } from '@playwright/test';

test.describe('Home - Projects Section - User Actions - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#projects').scrollIntoViewIfNeeded();
  });

  test('should have clickable project cards', async ({ page }) => {
    const card = page.locator('section#projects article a').first();
    await expect(card).toBeVisible();
  });

  test('should have project cards with hover effects', async ({ page }) => {
    const card = page.locator('section#projects article').first();
    const classList = await card.evaluate(el => el.className);
    expect(classList).toContain('group');
  });

  test('should have project images with scale effect on hover', async ({ page }) => {
    const image = page.locator('section#projects .project-image').first();
    const classList = await image.evaluate(el => el.className);
    expect(classList).toContain('group-hover:scale');
  });

  test('should navigate to project detail page', async ({ page }) => {
    const link = page.locator('section#projects article a').first();
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('/projects/');
  });

  test('should have project cards with lift effect on hover', async ({ page }) => {
    const card = page.locator('section#projects article a').first();
    const classList = await card.evaluate(el => el.className);
    expect(classList).toContain('hover:-translate-y-');
  });
});
