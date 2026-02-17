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

  test('should display profile image with correct styling', async ({ page }) => {
    const profileImage = page.locator('section#hero img[alt="Sebastian Alvarez"]');
    await expect(profileImage).toBeVisible();
    const imageSrc = await profileImage.getAttribute('src');
    expect(imageSrc).toBeTruthy();
  });

  test('should display profile image container with circular styling', async ({ page }) => {
    const imageContainer = page.locator('section#hero img[alt="Sebastian Alvarez"]').locator('..');
    const classList = await imageContainer.evaluate(el => el.className);
    expect(classList).toContain('rounded-full');
    expect(classList).toContain('border-4');
  });

  test('should display experience badge', async ({ page }) => {
    const badge = page.locator('section#hero').locator('text=+5 Years Experience');
    await expect(badge).toBeVisible();
  });

  test('should display main title', async ({ page }) => {
    const title = page.locator('section#hero h1');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText?.replace(/\s/g, '')).toContain('SebastianAlvarez');
  });

  test('should display subtitle', async ({ page }) => {
    const subtitle = page.locator('section#hero p', { hasText: /Senior Software Engineer/ });
    await expect(subtitle).toBeVisible();
  });

  test('should display description text', async ({ page }) => {
    const description = page.locator('section#hero p', { hasText: /Specialized in cloud infrastructure/ });
    await expect(description).toBeVisible();
  });

  test('should display Download CV button', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    await expect(cvButton).toBeVisible();
    const icon = cvButton.locator('svg');
    await expect(icon).toBeVisible();
  });

  test('should display Get in Touch button', async ({ page }) => {
    const touchButton = page.locator('section#hero button', { hasText: /Get in Touch/ });
    await expect(touchButton).toBeVisible();
    const icon = touchButton.locator('svg');
    await expect(icon).toBeVisible();
  });

  test('should have correct button layout (horizontal on desktop)', async ({ page }) => {
    const cvButton = page.locator('section#hero button', { hasText: /Download CV/ });
    const classList = await cvButton.evaluate(el => {
      let parent = el.parentElement;
      while (parent && !parent.className.includes('flex')) {
        parent = parent.parentElement;
      }
      return parent?.className || '';
    });
    expect(classList).toContain('flex-row');
  });

  test('should have proper spacing between elements', async ({ page }) => {
    const heroSection = page.locator('section#hero');
    const classList = await heroSection.evaluate(el => el.className);
    expect(classList).toContain('py-20');
  });

  test('should have correct text sizes on desktop', async ({ page }) => {
    const title = page.locator('section#hero h1');
    const fontSize = await title.evaluate(el => window.getComputedStyle(el).fontSize);
    const size = parseInt(fontSize);
    expect(size).toBeGreaterThanOrEqual(48);
  });

  test('should have centered layout', async ({ page }) => {
    const container = page.locator('section#hero').locator('.container');
    const classList = await container.evaluate(el => el.className);
    expect(classList).toContain('text-center');
  });

  test('should have proper image dimensions on desktop', async ({ page }) => {
    const imageWrapper = page.locator('section#hero img[alt="Sebastian Alvarez"]').locator('..').locator('..');
    const classList = await imageWrapper.evaluate(el => el.className);
    expect(classList).toContain('md:w-48');
    expect(classList).toContain('md:h-48');
  });
});
