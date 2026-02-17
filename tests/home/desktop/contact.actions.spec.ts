import { test, expect } from '@playwright/test';

test.describe('Home - Contact Section - User Actions - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.locator('section#contact').scrollIntoViewIfNeeded();
  });

  test('should have enabled input fields', async ({ page }) => {
    const nameInput = page.locator('section#contact input[id="name"]');
    await expect(nameInput).toBeEnabled();
  });

  test('should have enabled email input field', async ({ page }) => {
    const emailInput = page.locator('section#contact input[id="email"]');
    await expect(emailInput).toBeEnabled();
  });

  test('should have enabled message textarea', async ({ page }) => {
    const messageTextarea = page.locator('section#contact textarea[id="message"]');
    await expect(messageTextarea).toBeEnabled();
  });

  test('should have enabled submit button', async ({ page }) => {
    const submitButton = page.locator('section#contact button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('should accept text input in name field', async ({ page }) => {
    const nameInput = page.locator('section#contact input[id="name"]');
    await nameInput.fill('John Doe');
    const value = await nameInput.inputValue();
    expect(value).toBe('John Doe');
  });

  test('should accept email input in email field', async ({ page }) => {
    const emailInput = page.locator('section#contact input[id="email"]');
    await emailInput.fill('john@example.com');
    const value = await emailInput.inputValue();
    expect(value).toBe('john@example.com');
  });

  test('should accept text input in message field', async ({ page }) => {
    const messageTextarea = page.locator('section#contact textarea[id="message"]');
    await messageTextarea.fill('This is a test message for the contact form.');
    const value = await messageTextarea.inputValue();
    expect(value).toBe('This is a test message for the contact form.');
  });

  test('should have submit button with proper text', async ({ page }) => {
    const submitButton = page.locator('section#contact button[type="submit"]');
    const buttonText = await submitButton.textContent();
    expect(buttonText).toContain('Send Message');
  });

  test('should have form with proper structure', async ({ page }) => {
    const form = page.locator('section#contact form');
    await expect(form).toBeVisible();
  });
});
