import { test, expect } from '@playwright/test';

test.describe('Home - Experience Section - User Actions - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#experience').scrollIntoViewIfNeeded();
  });

  test('should expand experience item when clicking See more button', async ({ page }) => {
    const seeMoreButton = page.locator('section#experience button:has-text("See more")').first();
    await expect(seeMoreButton).toBeVisible();

    const initialBullets = await page.locator('section#experience li').count();

    await seeMoreButton.click();
    await page.waitForTimeout(300);

    const expandedBullets = await page.locator('section#experience li').count();
    expect(expandedBullets).toBeGreaterThan(initialBullets);
  });

  test('should collapse experience item when clicking Show less button', async ({ page }) => {
    const seeMoreButton = page.locator('section#experience button:has-text("See more")').first();
    await seeMoreButton.click();
    await page.waitForTimeout(300);

    const showLessButton = page.locator('section#experience button:has-text("Show less")').first();
    await expect(showLessButton).toBeVisible();

    await showLessButton.click();
    await page.waitForTimeout(300);

    const seeMoreButtonAgain = page.locator('section#experience button:has-text("See more")').first();
    await expect(seeMoreButtonAgain).toBeVisible();
  });

  test('should navigate to experience page from View All Experience link', async ({ page }) => {
    const viewAllLink = page.locator('section#experience a:has-text("View All Experience"):visible');
    await expect(viewAllLink).toBeVisible();

    const href = await viewAllLink.getAttribute('href');
    expect(href).toBe('/experience');
  });

  test('should have clickable experience cards', async ({ page }) => {
    const card = page.locator('section#experience article, section#experience .rounded-2xl').first();
    await expect(card).toBeVisible();
  });

  test('should have clickable See more buttons', async ({ page }) => {
    const seeMoreButton = page.locator('section#experience button:has-text("See more")').first();
    await expect(seeMoreButton).toBeEnabled();
    await seeMoreButton.hover();
    await expect(seeMoreButton).toBeVisible();
  });
});
