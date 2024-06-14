import { METADATA } from "@/app/lib/constants"
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test('has title', async ({ page }) => {
  const title = METADATA.title;
  expect(title).toMatch(/.+/);
  
  await expect(page).toHaveTitle(title);
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
})

test('has article', async ({ page }) => {
  const link = page.getByRole('main').getByRole('link').first();
  await expect(link.getByRole('heading')).toHaveText(/.+/);
  await expect(link.getByRole('time')).toHaveText(/.+/);

  const text = await link.getByRole('heading').textContent();
  await link.click();
  await expect(page.getByRole('heading', { name: text })).toBeVisible();
})