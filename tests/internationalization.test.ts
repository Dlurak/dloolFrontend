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

test('the language should adapt on the fly', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('combobox').selectOption('de');
	await page.waitForTimeout(500);
	// check that the language is german
	await expect( page.locator('html')).toHaveAttribute('lang', 'de');
	// check that there is something with the text "Wilkommen Bei Dlool"
	const heading =  page.locator('html').locator('body').locator('main').locator('h1');
	await expect(heading).toHaveText('Dlool\nDas Hausaufgabenheft der nächsten Generation für Deine ganze Klasse');

	await page.getByRole('combobox').selectOption('en');
	await page.waitForTimeout(500);
	// check that the language is english
	await expect( page.locator('html')).toHaveAttribute('lang', 'en');

	await expect(heading).toHaveText('Dlool\nNext generation homework for your entire class');
});
