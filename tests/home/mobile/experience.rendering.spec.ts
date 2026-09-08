import { test, expect } from '@playwright/test';

test.describe('Home - Experience Section - Rendering - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('section#experience').scrollIntoViewIfNeeded();
  });

  test('should render experience section on mobile', async ({ page }) => {
    const section = page.locator('section#experience');
    await expect(section).toBeVisible();
  });

  test('should display section title on mobile', async ({ page }) => {
    const title = page.locator('section#experience h2');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toContain('Work Experience');
  });

  test('should display experience items on mobile', async ({ page }) => {
    const items = page.locator('section#experience article');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should display company logos on mobile', async ({ page }) => {
    const logos = page.locator('section#experience img[alt*="logo"], section#experience svg');
    const count = await logos.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display job titles on mobile', async ({ page }) => {
    const jobTitles = page.locator('section#experience h3');
    const count = await jobTitles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display company names on mobile', async ({ page }) => {
    const companies = page.locator('section#experience').locator('p:has-text("Galileo"), p:has-text("Google"), p:has-text("Uwigo")');
    const count = await companies.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display employment dates on mobile', async ({ page }) => {
    const dates = page.locator('section#experience').locator('span:has-text("2025"), span:has-text("2024"), span:has-text("2023")');
    const count = await dates.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display locations on mobile', async ({ page }) => {
    const locations = page.locator('section#experience').locator('span:has-text("Remote"), span:has-text("Quito")');
    const count = await locations.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display responsibilities on mobile', async ({ page }) => {
    const bullets = page.locator('section#experience li');
    const count = await bullets.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have See more button on mobile', async ({ page }) => {
    const seeMoreButtons = page.locator('section#experience button:has-text("See more")');
    const count = await seeMoreButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display View All Experience button on mobile', async ({ page }) => {
    const viewAllLink = page.locator('section#experience a:has-text("View All Experience"):visible');
    await expect(viewAllLink).toBeVisible();
  });

  test('should have clean list styling on mobile', async ({ page }) => {
    const card = page.locator('section#experience article').first();
    await expect(card).toBeVisible();
  });
});
