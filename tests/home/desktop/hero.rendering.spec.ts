import { test, expect } from '@playwright/test';

test.describe('Home - Hero Section - Rendering - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
  });

  test('should render hero section', async ({ page }) => {
    const heroSection = page.locator('section#hero');
    await expect(heroSection).toBeVisible();
  });

  test('should display background image', async ({ page }) => {
    const heroImage = page.locator('section#hero img[alt="Sebastian Alvarez"]');
    await expect(heroImage).toBeVisible();
    const imageSrc = await heroImage.getAttribute('src');
    expect(imageSrc).toBeTruthy();
  });

  test('should display main title', async ({ page }) => {
    const title = page.locator('section#hero h1');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText?.replace(/\s/g, '')).toContain('SebastianAlvarez');
  });

  test('should display subtitle', async ({ page }) => {
    const subtitle = page.locator('section#hero span, section#hero p').filter({ hasText: /Senior Software Engineer/ });
    await expect(subtitle).toBeVisible();
  });

  test('should display description text', async ({ page }) => {
    const description = page.locator('section#hero p').filter({ hasText: /build web applications/ });
    await expect(description).toBeVisible();
  });

  test('should display Download CV button', async ({ page }) => {
    const cvButton = page.locator('section#hero button, section#hero a').filter({ hasText: /Download CV/ });
    await expect(cvButton).toBeVisible();
  });

  test('should display Get in Touch button', async ({ page }) => {
    const touchButton = page.locator('section#hero a[href="#contact"], section#hero button').filter({ hasText: /Get in Touch/ });
    await expect(touchButton).toBeVisible();
  });

  test('should have buttons in a horizontal layout on desktop', async ({ page }) => {
    const cvButton = page.locator('section#hero a[href*=".pdf"], section#hero button').filter({ hasText: /Download CV/ });
    const parent = cvButton.locator('xpath=..');
    const classList = await parent.evaluate(el => el.className);
    expect(classList.includes('flex-row') || classList.includes('sm:flex-row')).toBe(true);
  });
});
