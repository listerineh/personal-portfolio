import { test, expect } from '@playwright/test';

test.describe('Home - Projects Section - Rendering - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('section#projects').scrollIntoViewIfNeeded();
  });

  test('should render projects section on mobile', async ({ page }) => {
    const section = page.locator('section#projects');
    await expect(section).toBeVisible();
  });

  test('should display section title on mobile', async ({ page }) => {
    const title = page.locator('section#projects h2');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toContain('Featured Projects');
  });

  test('should display project cards on mobile', async ({ page }) => {
    const cards = page.locator('section#projects article');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display project images on mobile', async ({ page }) => {
    const images = page.locator('section#projects .project-image');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display project titles on mobile', async ({ page }) => {
    const titles = page.locator('section#projects article h3');
    const count = await titles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display project descriptions on mobile', async ({ page }) => {
    const descriptions = page.locator('section#projects article p');
    const count = await descriptions.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display project tags on mobile', async ({ page }) => {
    const tags = page.locator('section#projects article [class*="Pill"], section#projects article span[class*="border"], section#projects article span[class*="bg"]');
    const count = await tags.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display View project links on mobile', async ({ page }) => {
    const links = page.locator('section#projects article a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have project cards in single column on mobile', async ({ page }) => {
    const grid = page.locator('section#projects').locator('div[class*="grid"]').first();
    const classList = await grid.evaluate(el => el.className);
    expect(classList).toContain('grid');
    expect(classList).toContain('grid-cols-1');
  });

  test('should have project images with proper dimensions on mobile', async ({ page }) => {
    const image = page.locator('section#projects .project-image').first();
    const classList = await image.evaluate(el => el.className);
    expect(classList).toContain('project-image');
  });
});
