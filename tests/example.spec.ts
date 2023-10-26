import { test, expect } from '@playwright/test';

test('playwright is configuired correctly', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveURL('http://127.0.0.1:4173/');
});
