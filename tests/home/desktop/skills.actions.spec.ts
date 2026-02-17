import { test, expect } from '@playwright/test';

test.describe('Home - Skills Section - User Actions - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#skills').scrollIntoViewIfNeeded();
  });

  test('should have interactive skill cards', async ({ page }) => {
    const skillCard = page.locator('section#skills .skill-card').first();
    await expect(skillCard).toBeVisible();
  });

  test('should have skill cards with hover border effect', async ({ page }) => {
    const skillCard = page.locator('section#skills .skill-card').first();
    const classList = await skillCard.evaluate(el => el.className);
    expect(classList).toContain('hover:border-primary');
  });

  test('should have skill cards with cursor pointer', async ({ page }) => {
    const skillCard = page.locator('section#skills .skill-card').first();
    const classList = await skillCard.evaluate(el => el.className);
    expect(classList).toContain('cursor-pointer');
  });

  test('should display skill name on card', async ({ page }) => {
    const skillCard = page.locator('section#skills .skill-card').first();
    const skillName = await skillCard.locator('p').textContent();
    expect(skillName).toBeTruthy();
  });

  test('should have marquee animation on row 1', async ({ page }) => {
    const row1 = page.locator('section#skills .marquee-row').first();
    const transform = await row1.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    expect(transform).toBeTruthy();
  });

  test('should have marquee animation on row 2', async ({ page }) => {
    const row2 = page.locator('section#skills .marquee-row').nth(1);
    const transform = await row2.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    expect(transform).toBeTruthy();
  });

  test('should have skill cards with proper title attribute', async ({ page }) => {
    const skillCard = page.locator('section#skills .skill-card').first();
    const title = await skillCard.getAttribute('title');
    expect(title).toBeTruthy();
  });

  test('should have skill icons with alt text', async ({ page }) => {
    const skillIcon = page.locator('section#skills .skill-card img').first();
    const alt = await skillIcon.getAttribute('alt');
    expect(alt).toBeTruthy();
  });
});
