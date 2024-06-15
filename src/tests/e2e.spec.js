import { METADATA } from "@/app/lib/constants"
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test('has title', async ({ page }) => {
  const text = METADATA.title;
  expect(text).toMatch(/.+/);
  
  await expect(page).toHaveTitle(new RegExp(text));
  await expect(page.getByRole('heading', { name: text })).toBeVisible();
})

test('has article', async ({ page }) => {
  const link = page.getByRole('main').getByRole('link').first();
  await expect(link.getByRole('heading')).toHaveText(/.+/);
  await expect(link.getByRole('time')).toHaveText(/.+/);

  const text = await link.getByRole('heading').textContent();
  await link.click();
  await expect(page).toHaveTitle(new RegExp(text));
  await expect(page.getByRole('heading', { name: text })).toBeVisible();
})