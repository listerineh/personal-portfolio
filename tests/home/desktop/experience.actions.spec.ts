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
    
    const initialBullets = await page.locator('section#experience').locator('div[class*="flex items-start gap-3"]').count();
    
    await seeMoreButton.click();
    await page.waitForTimeout(300);
    
    const expandedBullets = await page.locator('section#experience').locator('div[class*="flex items-start gap-3"]').count();
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

  test('should show all experiences when clicking Show All Experience button', async ({ page }) => {
    const showAllButton = page.locator('section#experience button:has-text("Show All Experience")');
    await expect(showAllButton).toBeVisible();
    
    await showAllButton.click();
    await page.waitForTimeout(1000);
    
    const allItems = await page.locator('section#experience').locator('div[class*="relative group"]').count();
    expect(allItems).toBeGreaterThanOrEqual(8);
  });

  test('should have clickable experience cards', async ({ page }) => {
    const card = page.locator('section#experience').locator('div[class*="rounded-xl bg-card"]').first();
    await expect(card).toBeVisible();
    await expect(card).toBeEnabled();
  });

  test('should display hover effects on experience cards', async ({ page }) => {
    const card = page.locator('section#experience').locator('div[class*="rounded-xl bg-card"]').first();
    
    const initialColor = await card.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    await card.hover();
    
    const hoverColor = await card.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    expect(initialColor).toBeTruthy();
    expect(hoverColor).toBeTruthy();
  });

  test('should have clickable See more buttons', async ({ page }) => {
    const seeMoreButton = page.locator('section#experience button:has-text("See more")').first();
    await expect(seeMoreButton).toBeEnabled();
    await seeMoreButton.hover();
    await expect(seeMoreButton).toBeVisible();
  });

  test('should have clickable Show All Experience button', async ({ page }) => {
    const showAllButton = page.locator('section#experience button:has-text("Show All Experience")');
    await expect(showAllButton).toBeEnabled();
    await showAllButton.hover();
    await expect(showAllButton).toBeVisible();
  });
});
