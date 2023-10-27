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
	await expect(await page.locator('html')).toHaveAttribute('lang', 'de');
	// check that there is something with the text "Wilkommen Bei Dlool"
	const heading = await page.locator('html').locator('body').locator('main').locator('h1');
	const paragraph = await page.locator('html').locator('body').locator('main').locator('p');
	await expect(heading).toHaveText('Willkommen bei Dlool');
	await expect(paragraph).toHaveText('Dlool ist ein kollaboratives und offenes Hausaufgabenheft.');

	await page.getByRole('combobox').selectOption('en');
	await page.waitForTimeout(500);
	// check that the language is english
	await expect(await page.locator('html')).toHaveAttribute('lang', 'en');

	await expect(heading).toHaveText('Welcome to Dlool');
	await expect(paragraph).toHaveText('Dlool is a colloborative and open homeworkbook.');
});
