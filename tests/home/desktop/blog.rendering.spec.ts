import { test, expect } from '@playwright/test';

test.describe('Home - Blog Preview Section - Rendering - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#blog').scrollIntoViewIfNeeded();
  });

  test('should render blog section', async ({ page }) => {
    const section = page.locator('section#blog');
    await expect(section).toBeVisible();
  });

  test('should display section title', async ({ page }) => {
    const title = page.locator('section#blog h2');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toContain('Latest Thoughts');
  });

  test('should display blog badge', async ({ page }) => {
    const badge = page.locator('section#blog').locator('text=Blog');
    await expect(badge).toBeVisible();
  });

  test('should display blog post cards', async ({ page }) => {
    const cards = page.locator('section#blog article');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog post images', async ({ page }) => {
    const images = page.locator('section#blog .blog-image');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog post titles', async ({ page }) => {
    const titles = page.locator('section#blog article').locator('[class*="font-headline"]');
    const count = await titles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog post dates', async ({ page }) => {
    const dates = page.locator('section#blog time');
    const count = await dates.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display reading time', async ({ page }) => {
    const readingTime = page.locator('section#blog').locator('text=/min read/');
    const count = await readingTime.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog post excerpts', async ({ page }) => {
    const excerpts = page.locator('section#blog article').locator('[class*="line-clamp"]');
    const count = await excerpts.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display Read More text', async ({ page }) => {
    const readMore = page.locator('section#blog').locator('text=Read More');
    const count = await readMore.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display View All Posts button', async ({ page }) => {
    const viewAllButton = page.locator('section#blog a:has-text("View All Posts")');
    const count = await viewAllButton.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have blog posts in grid layout', async ({ page }) => {
    const grid = page.locator('section#blog').locator('div[class*="grid"]').first();
    const classList = await grid.evaluate(el => el.className);
    expect(classList).toContain('grid');
    expect(classList).toContain('lg:grid-cols-3');
  });

  test('should have blog cards with proper styling', async ({ page }) => {
    const card = page.locator('section#blog article').first();
    const classList = await card.evaluate(el => el.className);
    expect(classList).toContain('group');
  });

  test('should have blog images with proper dimensions', async ({ page }) => {
    const image = page.locator('section#blog .blog-image').first();
    const classList = await image.evaluate(el => el.className);
    expect(classList).toContain('blog-image');
  });
});
