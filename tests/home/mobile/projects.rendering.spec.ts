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

  test('should display hobbies badge on mobile', async ({ page }) => {
    const badge = page.locator('section#projects').locator('text=Hobbies');
    await expect(badge).toBeVisible();
  });

  test('should display project cards on mobile', async ({ page }) => {
    const cards = page.locator('section#projects').locator('div[class*="rounded-xl"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display project images on mobile', async ({ page }) => {
    const images = page.locator('section#projects img[alt]');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display project titles on mobile', async ({ page }) => {
    const titles = page.locator('section#projects h3');
    const count = await titles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display project descriptions on mobile', async ({ page }) => {
    const descriptions = page.locator('section#projects').locator('p:has-text("Effortlessly"), p:has-text("Discover"), p:has-text("This collaborative")');
    const count = await descriptions.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display project tags on mobile', async ({ page }) => {
    const tags = page.locator('section#projects').locator('span[class*="bg-primary"]');
    const count = await tags.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display Live Demo buttons on mobile', async ({ page }) => {
    const buttons = page.locator('section#projects a:has-text("Live Demo")');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display Source buttons on mobile', async ({ page }) => {
    const buttons = page.locator('section#projects a:has-text("Source")');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have project cards in single column on mobile', async ({ page }) => {
    const grid = page.locator('section#projects').locator('div[class*="grid"]').first();
    const classList = await grid.evaluate(el => el.className);
    expect(classList).toContain('grid');
    expect(classList).toContain('grid-cols-1');
  });

  test('should have project cards with proper styling on mobile', async ({ page }) => {
    const card = page.locator('section#projects').locator('[class*="rounded-xl"]').first();
    await expect(card).toBeVisible();
  });

  test('should have project images with proper dimensions on mobile', async ({ page }) => {
    const image = page.locator('section#projects img[alt]').first();
    const classList = await image.evaluate(el => el.className);
    expect(classList).toContain('project-image');
  });
});
