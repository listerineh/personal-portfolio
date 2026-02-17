import { test, expect } from '@playwright/test';

test.describe('Home - Contact Section - Rendering - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#contact').scrollIntoViewIfNeeded();
  });

  test('should render contact section', async ({ page }) => {
    const section = page.locator('section#contact');
    await expect(section).toBeVisible();
  });

  test('should display section title', async ({ page }) => {
    const title = page.locator('section#contact h2');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toContain('Get In Touch');
  });

  test('should display contact badge', async ({ page }) => {
    const badge = page.locator('section#contact').locator('text=Contact');
    await expect(badge).toBeVisible();
  });

  test('should display description text', async ({ page }) => {
    const description = page.locator('section#contact p:has-text("Have a project")');
    await expect(description).toBeVisible();
  });

  test('should display name label', async ({ page }) => {
    const label = page.locator('section#contact label:has-text("Your Name")');
    await expect(label).toBeVisible();
  });

  test('should display email label', async ({ page }) => {
    const label = page.locator('section#contact label:has-text("Your Email")');
    await expect(label).toBeVisible();
  });

  test('should display message label', async ({ page }) => {
    const label = page.locator('section#contact label:has-text("Your Message")');
    await expect(label).toBeVisible();
  });

  test('should display name input field', async ({ page }) => {
    const input = page.locator('section#contact input[id="name"]');
    await expect(input).toBeVisible();
  });

  test('should display email input field', async ({ page }) => {
    const input = page.locator('section#contact input[id="email"]');
    await expect(input).toBeVisible();
  });

  test('should display message textarea field', async ({ page }) => {
    const textarea = page.locator('section#contact textarea[id="message"]');
    await expect(textarea).toBeVisible();
  });

  test('should display submit button', async ({ page }) => {
    const button = page.locator('section#contact button[type="submit"]');
    await expect(button).toBeVisible();
  });

  test('should have form with proper structure', async ({ page }) => {
    const form = page.locator('section#contact form');
    await expect(form).toBeVisible();
  });

  test('should have input fields with proper styling', async ({ page }) => {
    const input = page.locator('section#contact input[id="name"]');
    const classList = await input.evaluate(el => el.className);
    expect(classList).toContain('h-12');
  });
});
