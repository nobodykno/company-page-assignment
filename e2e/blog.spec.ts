import { test, expect } from '@playwright/test';

test('blog page loads successfully', async ({ page }) => {
  await page.goto('/pages/blog');

  await expect(page).toHaveURL(/\/pages\/blog/);

  await expect(
    page.getByRole('main', { name: 'Blog page' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: /blog/i }).first(),
  ).toBeVisible();
});