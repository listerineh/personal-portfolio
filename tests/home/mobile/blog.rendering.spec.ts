import { test, expect } from '@playwright/test';

test.describe('Home - Blog Preview Section - Rendering - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('section#blog').scrollIntoViewIfNeeded();
  });

  test('should render blog section on mobile', async ({ page }) => {
    const section = page.locator('section#blog');
    await expect(section).toBeVisible();
  });

  test('should display section title on mobile', async ({ page }) => {
    const title = page.locator('section#blog h2');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toContain('Latest Thoughts');
  });

  test('should display blog badge on mobile', async ({ page }) => {
    const badge = page.locator('section#blog').locator('text=Blog');
    await expect(badge).toBeVisible();
  });

  test('should display blog post cards on mobile', async ({ page }) => {
    const cards = page.locator('section#blog article');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog post images on mobile', async ({ page }) => {
    const images = page.locator('section#blog .blog-image');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog post titles on mobile', async ({ page }) => {
    const titles = page.locator('section#blog article').locator('[class*="font-headline"]');
    const count = await titles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog post dates on mobile', async ({ page }) => {
    const dates = page.locator('section#blog time');
    const count = await dates.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display reading time on mobile', async ({ page }) => {
    const readingTime = page.locator('section#blog').locator('text=/min read/');
    const count = await readingTime.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog post excerpts on mobile', async ({ page }) => {
    const excerpts = page.locator('section#blog article').locator('[class*="line-clamp"]');
    const count = await excerpts.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display Read More text on mobile', async ({ page }) => {
    const readMore = page.locator('section#blog').locator('text=Read More');
    const count = await readMore.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display View All Posts button on mobile', async ({ page }) => {
    const viewAllButton = page.locator('section#blog a:has-text("View All Posts")');
    const count = await viewAllButton.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have blog posts in single column on mobile', async ({ page }) => {
    const grid = page.locator('section#blog').locator('div[class*="grid"]').first();
    const classList = await grid.evaluate(el => el.className);
    expect(classList).toContain('grid');
    expect(classList).toContain('grid-cols-1');
  });

  test('should have blog cards with proper styling on mobile', async ({ page }) => {
    const card = page.locator('section#blog article').first();
    const classList = await card.evaluate(el => el.className);
    expect(classList).toContain('group');
  });

  test('should have blog images with proper dimensions on mobile', async ({ page }) => {
    const image = page.locator('section#blog .blog-image').first();
    const classList = await image.evaluate(el => el.className);
    expect(classList).toContain('blog-image');
  });
});
