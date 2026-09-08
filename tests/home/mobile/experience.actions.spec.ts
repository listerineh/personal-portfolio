import { test, expect } from '@playwright/test';

test.describe('Home - Experience Section - User Actions - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('section#experience').scrollIntoViewIfNeeded();
  });

  test('should expand experience item when clicking See more button on mobile', async ({ page }) => {
    const seeMoreButton = page.locator('section#experience button:has-text("See more")').first();
    await expect(seeMoreButton).toBeVisible();

    const initialBullets = await page.locator('section#experience li').count();

    await seeMoreButton.click();
    await page.waitForTimeout(300);

    const expandedBullets = await page.locator('section#experience li').count();
    expect(expandedBullets).toBeGreaterThan(initialBullets);
  });

  test('should collapse experience item when clicking Show less button on mobile', async ({ page }) => {
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

  test('should navigate to experience page from View All Experience link on mobile', async ({ page }) => {
    const viewAllLink = page.locator('section#experience a:has-text("View All Experience"):visible');
    await expect(viewAllLink).toBeVisible();

    const href = await viewAllLink.getAttribute('href');
    expect(href).toBe('/experience');
  });

  test('should have sufficient touch target size for See more buttons on mobile', async ({ page }) => {
    const button = page.locator('section#experience button:has-text("See more")').first();
    const boundingBox = await button.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
    expect(boundingBox?.width).toBeGreaterThanOrEqual(44);
  });
});
