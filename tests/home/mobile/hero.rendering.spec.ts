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

  test('should display background image on mobile', async ({ page }) => {
    const heroImage = page.locator('section#hero img[alt="Sebastian Alvarez"]');
    await expect(heroImage).toBeVisible();
  });

  test('should display main title on mobile', async ({ page }) => {
    const title = page.locator('section#hero h1');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText?.replace(/\s/g, '')).toContain('SebastianAlvarez');
  });

  test('should display subtitle on mobile', async ({ page }) => {
    const subtitle = page.locator('section#hero span, section#hero p').filter({ hasText: /Senior Software Engineer/ });
    await expect(subtitle).toBeVisible();
  });

  test('should display description on mobile', async ({ page }) => {
    const description = page.locator('section#hero p').filter({ hasText: /build web applications/ });
    await expect(description).toBeVisible();
  });

  test('should display Download CV button on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero button, section#hero a').filter({ hasText: /Download CV/ });
    await expect(cvButton).toBeVisible();
  });

  test('should display Get in Touch button on mobile', async ({ page }) => {
    const touchButton = page.locator('section#hero a[href="#contact"], section#hero button').filter({ hasText: /Get in Touch/ });
    await expect(touchButton).toBeVisible();
  });

  test('should stack buttons vertically on mobile', async ({ page }) => {
    const cvButton = page.locator('section#hero a[href*=".pdf"], section#hero button').filter({ hasText: /Download CV/ });
    const parent = cvButton.locator('xpath=..');
    const classList = await parent.evaluate(el => el.className);
    expect(classList.includes('flex-col')).toBe(true);
  });

  test('should have readable font sizes on mobile', async ({ page }) => {
    const title = page.locator('section#hero h1');
    const fontSize = await title.evaluate(el => window.getComputedStyle(el).fontSize);
    const size = parseInt(fontSize);
    expect(size).toBeGreaterThanOrEqual(20);
  });

  test('should have full-width buttons on mobile', async ({ page }) => {
    const touchButton = page.locator('section#hero a[href="#contact"], section#hero button').filter({ hasText: /Get in Touch/ });
    const classList = await touchButton.evaluate(el => el.className);
    expect(classList.includes('w-full') || classList.includes('sm:w-auto')).toBe(true);
  });
});
