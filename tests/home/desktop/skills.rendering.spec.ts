import { test, expect } from '@playwright/test';

test.describe('Home - Skills Section - Rendering - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#skills').scrollIntoViewIfNeeded();
  });

  test('should render skills section', async ({ page }) => {
    const section = page.locator('section#skills');
    await expect(section).toBeVisible();
  });

  test('should display section title', async ({ page }) => {
    const title = page.locator('section#skills h2');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toContain('Technologies I Work With');
  });

  test('should display tech stack badge', async ({ page }) => {
    const badge = page.locator('section#skills').locator('text=Tech Stack');
    await expect(badge).toBeVisible();
  });

  test('should display skill cards', async ({ page }) => {
    const skillCards = page.locator('section#skills .skill-card');
    const count = await skillCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display skill icons', async ({ page }) => {
    const skillIcons = page.locator('section#skills .skill-card img');
    const count = await skillIcons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display skill names', async ({ page }) => {
    const skillNames = page.locator('section#skills .skill-card p');
    const count = await skillNames.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display two marquee rows', async ({ page }) => {
    const marqueeRows = page.locator('section#skills .marquee-row');
    const count = await marqueeRows.count();
    expect(count).toBe(2);
  });

  test('should display description text', async ({ page }) => {
    const description = page.locator('section#skills p:has-text("Proficient")');
    await expect(description).toBeVisible();
  });

  test('should have skill cards with proper styling', async ({ page }) => {
    const skillCard = page.locator('section#skills .skill-card').first();
    const classList = await skillCard.evaluate(el => el.className);
    expect(classList).toContain('skill-card');
    expect(classList).toContain('rounded-lg');
    expect(classList).toContain('bg-card');
  });

  test('should have marquee rows with overflow hidden', async ({ page }) => {
    const marqueeContainer = page.locator('section#skills').locator('div.overflow-hidden').first();
    await expect(marqueeContainer).toBeVisible();
  });

  test('should have skill cards with proper dimensions on desktop', async ({ page }) => {
    const skillCard = page.locator('section#skills .skill-card').first();
    const classList = await skillCard.evaluate(el => el.className);
    expect(classList).toContain('md:min-w-[112px]');
  });

  test('should have skill icons with proper sizing on desktop', async ({ page }) => {
    const skillIcon = page.locator('section#skills .skill-card img').first();
    const classList = await skillIcon.evaluate(el => el.className);
    expect(classList).toContain('md:h-14');
    expect(classList).toContain('md:w-14');
  });
});
