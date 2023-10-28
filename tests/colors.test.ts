// import { hexToRgb } from '$lib/colors/hexToRgb';
import { test, expect } from '@playwright/test';
import { hexToRgb, rgbToHex } from '../src/lib/colors/hexToRgb';

test.describe('hexToRgb', () => {
	test('it should convert correctly to rgb', () => {
		expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
		expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
		expect(hexToRgb('#ff00ff')).toEqual({ r: 255, g: 0, b: 255 });
		expect(hexToRgb('#4488ff')).toEqual({ r: 68, g: 136, b: 255 });
		expect(hexToRgb('#1ab2cd')).toEqual({ r: 26, g: 178, b: 205 });
		expect(hexToRgb('#7f7f7f')).toEqual({ r: 127, g: 127, b: 127 });
		expect(hexToRgb('#0088cc')).toEqual({ r: 0, g: 136, b: 204 });
		expect(hexToRgb('#ffcc00')).toEqual({ r: 255, g: 204, b: 0 });
		expect(hexToRgb('#9900cc')).toEqual({ r: 153, g: 0, b: 204 });
	});
	test("it shouldn't work", () => {
		expect(hexToRgb('Hi there')).toEqual(null);
		expect(hexToRgb('')).toEqual(null);
		expect(hexToRgb('#')).toEqual(null);
		expect(hexToRgb('#00000')).toEqual(null);
		expect(hexToRgb('#gghh00')).toEqual(null);
		expect(hexToRgb('#fffff-')).toEqual(null);
	});
});

test.describe('rgbToHex', () => {
	test('it works', () => {
		expect(rgbToHex(0, 0, 0)).toEqual('#000000');
		expect(rgbToHex(255, 255, 255)).toEqual('#ffffff');
		expect(rgbToHex(255, 0, 255)).toEqual('#ff00ff');
		expect(rgbToHex(42, 42, 42)).toEqual('#2a2a2a');
	});
});

// now real e2e tests
test.describe('the colors page', () => {
	test('it should work', async ({ page }) => {
		await page.goto('/');

		await page.getByRole('link', { name: 'Einstellungen ' }).click();
		await page.getByRole('link', { name: ' Farben' }).click();

		await expect(page).toHaveTitle('Dlool | Farben für Fächer');

		await page.getByRole('button', { name: ' Neues Fach hinzufügen' }).click();

		await page.getByPlaceholder('Fach').click();
		await page.getByPlaceholder('Fach').fill('Blau');
		await page.getByRole('button', { name: '#3f51b5' }).click();

		const sliderLoc = await page.getByRole('slider');
		await expect(await sliderLoc.count()).toEqual(3);

		// set the first two sliders to 0
		await sliderLoc.first().evaluate((el: HTMLInputElement) => (el.value = '0'));
		await sliderLoc.nth(1).evaluate((el: HTMLInputElement) => (el.value = '0'));
		await sliderLoc.nth(2).evaluate((el: HTMLInputElement) => (el.value = '255'));
		(await sliderLoc.all()).forEach(async (el) => {
			await el.dispatchEvent('input');
			await el.dispatchEvent('change');
		});

		const previewArea = await page.locator(
			'.p-4 > .bg-\\[rgb\\(var\\(--red\\)\\,var\\(--green\\)\\,var\\(--blue\\)\\)\\]'
		);
		const bgValue = await previewArea.evaluate(
			(el: HTMLDivElement) => window.getComputedStyle(el).backgroundColor
		);
		await expect(bgValue).toEqual('rgb(0, 0, 255)');
		await page.getByRole('button', { name: 'Farbe auswählen' }).click();
	});

	test('it should be stored on reload', async ({ page }) => {
		await page.goto('/settings/colors');
		await expect(page).toHaveTitle('Dlool | Farben für Fächer');

		await page.getByRole('button', { name: ' Neues Fach hinzufügen' }).click();
		// now fill in the subject
		await page.getByPlaceholder('Fach').click();
		await page.getByPlaceholder('Fach').fill('Playwright');
		await page.getByRole('button', { name: '#3f51b5' }).click();
		const sliderList = await page.getByRole('slider').all();

		for (const el of sliderList) {
			await el.evaluate((el: HTMLInputElement) => (el.value = '0'));
			await el.dispatchEvent('input');
			await el.dispatchEvent('change');
		}

		await page.getByRole('button', { name: 'Farbe auswählen' }).click();

		// run two times
		for (let i = 0; i < 2; i++) {
			await expect(await page.getByRole('button', { name: '#000000' })).toBeVisible();
			await expect(await page.getByPlaceholder('Fach')).toHaveValue('Playwright');
			await page.reload();
		}
	});
});
