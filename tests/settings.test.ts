import { test, expect } from '@playwright/test';

test('the settings page is reachable', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('link', { name: 'Einstellungen ' }).click();
	await expect(page).toHaveTitle('Dlool | Einstellungen');

	await page.getByRole('link', { name: ' Allgemein' }).click();
	await expect(page).toHaveTitle('Dlool | Einstellungen');
});

test('the theme can be changed and adapts and is saved', async ({ page }) => {
	await page.goto('/settings/preferences');

	const locator = await page.locator('html');

	for (let i = 0; i < 2; i++) {
		await page.emulateMedia({ colorScheme: 'light' });
		await expect(locator).toHaveClass('light');
		await expect(locator).not.toHaveClass('dark');

		await page.emulateMedia({ colorScheme: 'dark' });
		await expect(locator).not.toHaveClass('light');
		await expect(locator).toHaveClass('dark');

		// darkmode and manual light
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.getByRole('main').getByRole('combobox').selectOption('light');
		await expect(locator).toHaveClass('light');
		await expect(locator).not.toHaveClass('dark');

		// check that after a reload the theme is still light
		await page.reload();
		await page.waitForTimeout(1000);
		await expect(locator).toHaveClass('light');
		await expect(locator).not.toHaveClass('dark');

		// lightmode and manual dark
		await page.emulateMedia({ colorScheme: 'light' });
		await page.getByRole('main').getByRole('combobox').selectOption('dark');
		await expect(locator).not.toHaveClass('light');
		await expect(locator).toHaveClass('dark');

		// check that after a reload the theme is still dark
		await page.reload();
		await page.waitForTimeout(1000);
		await expect(locator).not.toHaveClass('light');

		await page.getByRole('main').getByRole('combobox').selectOption('system');
		await page.reload();
	}
});

test('the text in navigion can be toggled and is saved', async ({ page }) => {
	await page.goto('/settings/preferences');

	let localator = await page.getByRole('switch').first();

	await expect(localator).toBeChecked();

	let navItems = await page.locator('nav').locator('div').locator('a');

	// write the names of the navItems into an array
	let navItemsArray = await navItems.all();

	for (let i = 0; i < navItemsArray.length; i++) {
		const navItem = navItemsArray[i];
		const navItemHasImg = (await navItem.locator('img').count()) > 0;
		if (navItemHasImg) {
			await expect(navItem).toHaveText('');
		} else {
			await expect(navItem).toHaveText(/.*/);
		}
	}

	await page.waitForTimeout(300);

	localator = await page.getByRole('switch').first();
	await localator.click();
	await page.waitForTimeout(300);
	await expect(localator).not.toBeChecked();

	// now make sure that nothing has a text
	navItems = await page.locator('nav').locator('div').locator('a');
	navItemsArray = await navItems.all();

	for (let i = 0; i < navItemsArray.length; i++) {
		const navItem = navItemsArray[i];
		const navItemHasImg = (await navItem.locator('img').count()) > 0;
		if (navItemHasImg) await expect(navItem).toHaveText('');
	}

	await page.reload();

	await expect(localator).not.toBeChecked();
	// now make sure that nothing has a text
	navItems = await page.locator('nav').locator('div').locator('a');
	navItemsArray = await navItems.all();

	for (let i = 0; i < navItemsArray.length; i++) {
		const navItem = navItemsArray[i];
		const navItemHasBxIcon = (await navItem.locator('i.bx').count()) > 0;
		if (navItemHasBxIcon) await expect(navItem).toHaveText('');
	}

	localator = await page.getByRole('switch').first();
	await localator.click();
	await expect(localator).toBeChecked();
	await page.reload();
});
