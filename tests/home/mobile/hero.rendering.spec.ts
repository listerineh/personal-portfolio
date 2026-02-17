import { test, expect } from '@playwright/test';

test.describe('Home - Hero Section - Rendering - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('should render hero section on mobile', async ({ page }) => {
    const heroSection = page.locator('section#hero');
    await expect(heroSection).toBeVisible();
  });

  test('should display profile image on mobile', async ({ page }) => {
    const profileImage = page.locator('section#hero img[alt="Sebastian Alvarez"]');
    await expect(profileImage).toBeVisible();
  });

  test('should display experience badge on mobile', async ({ page }) => {
    const badge = page.locator('section#hero').locator('text=+5 Years Experience');
    await expect(badge).toBeVisible();
  });

  test('should display main title on mobile', async ({ page }) => {
    const title = page.locator('section#hero h1');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText?.replace(/\s/g, '')).toContain('SebastianAlvarez');
  });

  test('should display subtitle on mobile', async ({ page }) => {
    const subtitle = page.locator('section#hero p', { hasText: /Senior Software Engineer/ });
    await expect(subtitle).toBeVisible();
  });

  test('should display description on mobile', async ({ page }) => {
    const description = page.locator('section#hero p', { hasText: /Specialized in cloud infrastructure/ });
    await expect(description).toBeVisible();
  });

  test('should display Download CV button on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    await expect(cvButton).toBeVisible();
  });

  test('should display Get in Touch button on mobile', async ({ page }) => {
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    await expect(touchButton).toBeVisible();
  });

  test('should stack buttons vertically on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    const classList = await cvButton.evaluate(el => {
      let parent = el.parentElement;
      while (parent && !parent.className.includes('flex')) {
        parent = parent.parentElement;
      }
      return parent?.className || '';
    });
    expect(classList).toContain('flex-col');
  });

  test('should have smaller image on mobile', async ({ page }) => {
    const imageWrapper = page.locator('section#hero img[alt="Sebastian Alvarez"]').locator('..').locator('..');
    const classList = await imageWrapper.evaluate(el => el.className);
    expect(classList).toContain('w-36');
    expect(classList).toContain('h-36');
  });

  test('should have readable font sizes on mobile', async ({ page }) => {
    const title = page.locator('section#hero h1');
    const fontSize = await title.evaluate(el => window.getComputedStyle(el).fontSize);
    const size = parseInt(fontSize);
    expect(size).toBeGreaterThanOrEqual(20);
  });

  test('should have full-width buttons on mobile', async ({ page }) => {
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    const classList = await touchButton.evaluate(el => el.className);
    expect(classList).toContain('w-full');
  });
});
