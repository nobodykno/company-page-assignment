import { test, expect } from '@playwright/test';

test('user can open a blog detail page', async ({ page }) => {
  await page.goto('/pages/blog');

  const blogLink = page.locator('a[href*="/pages/blog/"]').first();

  await expect(blogLink).toBeVisible();

  await blogLink.click();

  await expect(page).toHaveURL(/\/pages\/blog\/.+/);

  await expect(
    page.getByRole('heading', { level: 1 }),
  ).toBeVisible();

  await expect(
    page.getByText(/^By /),
  ).toBeVisible();
});