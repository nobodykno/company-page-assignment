import { test, expect } from '@playwright/test';

test('home page loads successfully', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/pages\/dashboard/);
  await expect(
    page.getByRole('main', { name: 'DIGITAL SOLUTIONS' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: /digital solutions/i }),
  ).toBeVisible();
});