import { test, expect } from '@playwright/test';

test('playwright is configuired correctly', async ({ page }) => {
	console.log('Starting the test');
	console.log(page);
	await page.goto('/');
	console.log('Page is visited on /');

	await expect(page).toHaveURL('http://127.0.0.1:4173/');
	console.log('URL is correct');
});
