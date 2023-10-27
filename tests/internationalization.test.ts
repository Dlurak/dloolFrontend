import { test, expect } from '@playwright/test';

test('the language should be saved', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('combobox').selectOption('de');
	await page.waitForTimeout(500);
	await page.reload();
	await page.waitForTimeout(500);
	await expect(await page.getByRole('combobox')).toHaveValue('de');
	await page.getByRole('combobox').selectOption('en');
	await page.waitForTimeout(500);
	await page.goto('/settings');
	await page.waitForTimeout(500);
	await expect(await page.getByRole('combobox')).toHaveValue('en');
});
