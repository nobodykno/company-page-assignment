import { test, expect } from '@playwright/test';

test('about page loads successfully', async ({ page }) => {
  await page.goto('/pages/about');

  await expect(page).toHaveURL(/\/pages\/about/);

  await expect(
    page.getByRole('heading', { name: 'About Us' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Our Mission' }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Our Team' }),
  ).toBeVisible();
});