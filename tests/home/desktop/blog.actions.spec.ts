import { test, expect } from '@playwright/test';

test.describe('Home - Blog Preview Section - User Actions - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#blog').scrollIntoViewIfNeeded();
  });

  test('should have clickable blog post cards', async ({ page }) => {
    const card = page.locator('section#blog article a').first();
    await expect(card).toBeVisible();
  });

  test('should have blog post cards with hover effects', async ({ page }) => {
    const article = page.locator('section#blog article').first();
    const classList = await article.evaluate(el => el.className);
    expect(classList).toContain('group');
  });

  test('should have blog images with scale effect on hover', async ({ page }) => {
    const image = page.locator('section#blog .blog-image').first();
    const classList = await image.evaluate(el => el.className);
    expect(classList).toContain('group-hover:scale-110');
  });

  test('should have blog post titles with color change on hover', async ({ page }) => {
    const title = page.locator('section#blog article').locator('[class*="font-headline"]').first();
    const classList = await title.evaluate(el => el.className);
    expect(classList).toContain('group-hover:text-primary');
  });

  test('should have Read More text with arrow icon', async ({ page }) => {
    const readMore = page.locator('section#blog').locator('text=Read More').first();
    await expect(readMore).toBeVisible();
  });

  test('should have blog post links with proper href', async ({ page }) => {
    const link = page.locator('section#blog article a').first();
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('/blog/');
  });

  test('should have View All Posts button with proper href', async ({ page }) => {
    const viewAllButton = page.locator('section#blog a:has-text("View All Posts")');
    const count = await viewAllButton.count();
    if (count > 0) {
      const href = await viewAllButton.first().getAttribute('href');
      expect(href).toBe('/blog');
    }
  });

  test('should have blog cards with shadow effect on hover', async ({ page }) => {
    const article = page.locator('section#blog article').first();
    const link = article.locator('a');
    const classList = await link.evaluate(el => {
      const card = el.querySelector('[class*="bg-gradient"]');
      return card?.className || '';
    });
    expect(classList).toContain('hover:shadow-2xl');
  });
});
