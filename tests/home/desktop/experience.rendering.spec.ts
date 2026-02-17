import { test, expect } from '@playwright/test';

test.describe('Home - Experience Section - Rendering - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#experience').scrollIntoViewIfNeeded();
  });

  test('should render experience section', async ({ page }) => {
    const section = page.locator('section#experience');
    await expect(section).toBeVisible();
  });

  test('should display section title', async ({ page }) => {
    const title = page.locator('section#experience h2');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toContain('Work Experience');
  });

  test('should display career badge', async ({ page }) => {
    const badge = page.locator('section#experience').locator('text=Career');
    await expect(badge).toBeVisible();
  });

  test('should display first three experience items', async ({ page }) => {
    const items = page.locator('section#experience').locator('div[class*="relative group"]').filter({ hasNot: page.locator('.hidden') });
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should display company logos or icons', async ({ page }) => {
    const logos = page.locator('section#experience img[alt*="logo"]');
    const count = await logos.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display job titles', async ({ page }) => {
    const jobTitles = page.locator('section#experience h3');
    const count = await jobTitles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display company names', async ({ page }) => {
    const companies = page.locator('section#experience').locator('p:has-text("Galileo"), p:has-text("Google"), p:has-text("Uwigo")');
    const count = await companies.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display employment dates', async ({ page }) => {
    const dates = page.locator('section#experience').locator('span:has-text("2025"), span:has-text("2024"), span:has-text("2023")');
    const count = await dates.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display locations', async ({ page }) => {
    const locations = page.locator('section#experience').locator('span:has-text("Remote"), span:has-text("Quito")');
    const count = await locations.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display responsibilities as bullet points', async ({ page }) => {
    const bullets = page.locator('section#experience').locator('div[class*="flex items-start gap-3"]');
    const count = await bullets.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have See more button for items with more than 3 responsibilities', async ({ page }) => {
    const seeMoreButtons = page.locator('section#experience button:has-text("See more")');
    const count = await seeMoreButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display Show All Experience button', async ({ page }) => {
    const showAllButton = page.locator('section#experience button:has-text("Show All Experience")');
    await expect(showAllButton).toBeVisible();
  });

  test('should have proper card styling', async ({ page }) => {
    const card = page.locator('section#experience').locator('div[class*="rounded-xl bg-card"]').first();
    const classList = await card.evaluate(el => el.className);
    expect(classList).toContain('rounded-xl');
    expect(classList).toContain('bg-card');
  });

  test('should display experience items with hover effects', async ({ page }) => {
    const card = page.locator('section#experience').locator('div[class*="group"]').first();
    const classList = await card.evaluate(el => el.className);
    expect(classList).toContain('group');
  });
});
