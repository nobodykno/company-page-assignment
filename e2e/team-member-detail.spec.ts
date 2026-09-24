import { test, expect } from '@playwright/test';

test('user can open a team member detail page', async ({ page }) => {
  await page.goto('/pages/about');

  const teamMemberLink = page
    .locator('a[href^="/pages/team-member-detail/"]')
    .first();

  await expect(teamMemberLink).toBeVisible();

  await teamMemberLink.click();

  await expect(page).toHaveURL(
    /\/pages\/team-member-detail\/\d+/,
  );

  await expect(
    page.getByRole('heading', { level: 1 }),
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Position' }),
  ).toBeVisible();
});