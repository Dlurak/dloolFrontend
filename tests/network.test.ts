import { test, expect } from '@playwright/test';

test.describe('changes in the network should be monitored', () => {
	test('a toast should be shown when the network changges', async ({ page, browser }) => {
		await browser.contexts()[0].setOffline(false);
		await page.goto('/');
		await page.waitForTimeout(1000);
		await browser.contexts()[0].setOffline(true);

		await page.waitForTimeout(1000);

		const toast = await page.getByRole('alert');

		await page.waitForTimeout(1000);

		await expect(toast).toBeVisible();
		await expect(toast).toHaveText('Du bist offline. ');

		await browser.contexts()[0].setOffline(false);

		await page.waitForTimeout(1000);

		const lastToast = await toast.last();
		await expect(lastToast).toHaveText('Du bist wieder online. ');
	});

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
