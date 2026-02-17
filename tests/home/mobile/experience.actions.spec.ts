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
    
    const initialBullets = await page.locator('section#experience').locator('div[class*="flex items-start gap-3"]').count();
    
    await seeMoreButton.click();
    await page.waitForTimeout(300);
    
    const expandedBullets = await page.locator('section#experience').locator('div[class*="flex items-start gap-3"]').count();
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

  test('should show all experiences when clicking Show All Experience button on mobile', async ({ page }) => {
    const showAllButton = page.locator('section#experience button:has-text("Show All Experience")');
    await expect(showAllButton).toBeVisible();
    
    await showAllButton.click();
    await page.waitForTimeout(1000);
    
    const allItems = await page.locator('section#experience').locator('div[class*="relative group"]').count();
    expect(allItems).toBeGreaterThanOrEqual(8);
  });

  test('should have clickable experience cards on mobile', async ({ page }) => {
    const card = page.locator('section#experience').locator('div[class*="rounded-xl bg-card"]').first();
    await expect(card).toBeVisible();
    await expect(card).toBeEnabled();
  });

  test('should have sufficient touch target size for See more buttons on mobile', async ({ page }) => {
    const seeMoreButton = page.locator('section#experience button:has-text("See more")').first();
    const boundingBox = await seeMoreButton.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(16);
    expect(boundingBox?.width).toBeGreaterThanOrEqual(16);
  });

  test('should have sufficient touch target size for Show All button on mobile', async ({ page }) => {
    const showAllButton = page.locator('section#experience button:has-text("Show All Experience")');
    const boundingBox = await showAllButton.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
    expect(boundingBox?.width).toBeGreaterThanOrEqual(44);
  });

  test('should have proper spacing between experience items on mobile', async ({ page }) => {
    const items = page.locator('section#experience').locator('div[class*="relative group"]').filter({ hasNot: page.locator('.hidden') });
    const count = await items.count();
    
    if (count >= 2) {
      const firstItem = items.nth(0);
      const secondItem = items.nth(1);
      
      const firstBox = await firstItem.boundingBox();
      const secondBox = await secondItem.boundingBox();
      
      if (firstBox && secondBox) {
        const verticalGap = secondBox.y - (firstBox.y + firstBox.height);
        expect(verticalGap).toBeGreaterThan(0);
      }
    }
  });
});
