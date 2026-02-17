import { test, expect } from '@playwright/test';

test.describe('Home - Contact Section - User Actions - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('section#contact').scrollIntoViewIfNeeded();
  });

  test('should have enabled input fields on mobile', async ({ page }) => {
    const nameInput = page.locator('section#contact input[id="name"]');
    await expect(nameInput).toBeEnabled();
  });

  test('should have enabled email input field on mobile', async ({ page }) => {
    const emailInput = page.locator('section#contact input[id="email"]');
    await expect(emailInput).toBeEnabled();
  });

  test('should have enabled message textarea on mobile', async ({ page }) => {
    const messageTextarea = page.locator('section#contact textarea[id="message"]');
    await expect(messageTextarea).toBeEnabled();
  });

  test('should have enabled submit button on mobile', async ({ page }) => {
    const submitButton = page.locator('section#contact button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('should accept text input in name field on mobile', async ({ page }) => {
    const nameInput = page.locator('section#contact input[id="name"]');
    await nameInput.fill('John Doe');
    const value = await nameInput.inputValue();
    expect(value).toBe('John Doe');
  });

  test('should accept email input in email field on mobile', async ({ page }) => {
    const emailInput = page.locator('section#contact input[id="email"]');
    await emailInput.fill('john@example.com');
    const value = await emailInput.inputValue();
    expect(value).toBe('john@example.com');
  });

  test('should accept text input in message field on mobile', async ({ page }) => {
    const messageTextarea = page.locator('section#contact textarea[id="message"]');
    await messageTextarea.fill('This is a test message for the contact form.');
    const value = await messageTextarea.inputValue();
    expect(value).toBe('This is a test message for the contact form.');
  });

  test('should have sufficient touch target size for input fields on mobile', async ({ page }) => {
    const nameInput = page.locator('section#contact input[id="name"]');
    const boundingBox = await nameInput.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
    expect(boundingBox?.width).toBeGreaterThanOrEqual(44);
  });

  test('should have sufficient touch target size for submit button on mobile', async ({ page }) => {
    const submitButton = page.locator('section#contact button[type="submit"]');
    const boundingBox = await submitButton.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
    expect(boundingBox?.width).toBeGreaterThanOrEqual(44);
  });
});
