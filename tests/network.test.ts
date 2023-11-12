import { test, expect } from '@playwright/test';

test.describe('changes in the network should be monitored', () => {
	test('the contact section in the footer should be hidden when the network is offline', async ({
		page,
		browser
	}) => {
		await browser.contexts()[0].setOffline(false);
		await page.goto('/');
		await page.waitForTimeout(500);
		const contact = await page.getByRole('heading', { name: 'Kontakt' });

		await expect(contact).toBeVisible();

		await browser.contexts()[0].setOffline(true);
		await page.waitForTimeout(1000);

		await expect(contact).not.toBeVisible();

		await browser.contexts()[0].setOffline(false);
		await page.waitForTimeout(1000);

		await expect(contact).toBeVisible();
	});
});
