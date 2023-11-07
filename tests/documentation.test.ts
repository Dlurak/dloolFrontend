import { test, expect } from '@playwright/test';
import { setNestedProperty } from '../src/lib/utils/setMultipleKeys';
import { mergeObjects } from '../src/lib/utils/mergeObjects';

test.describe('setNestedProperty', () => {
	test('it works', async () => {
		await expect(setNestedProperty(['a', 'b', 'c'], 1)).toEqual({
			a: {
				b: {
					c: 1
				}
			}
		});

		await expect(setNestedProperty([], false)).toEqual(false);

		await expect(setNestedProperty(['a'], false)).toEqual({
			a: false
		});

		await expect(setNestedProperty(['a', 'b'], false)).toEqual({
			a: {
				b: false
			}
		});

		await expect(setNestedProperty(['a', 'b', 'c'], 'c')).toEqual({
			a: {
				b: {
					c: 'c'
				}
			}
		});
	});
});

test.describe('merge objects', () => {
	test('it works', async () => {
		await expect(mergeObjects([{ a: 1 }, { b: 2 }])).toEqual({ a: 1, b: 2 });
		await expect(mergeObjects([{ a: 1 }, { a: 2 }])).toEqual({ a: 2 });
		await expect(mergeObjects([{ a: 1 }, { a: { b: 2 } }])).toEqual({ a: { b: 2 } });
		await expect(mergeObjects([{ a: 1 }, { b: 2 }, { c: 3 }])).toEqual({ a: 1, b: 2, c: 3 });
		await expect(mergeObjects([{ a: 1 }, { b: { c: { d: [1, 2, 3] } } }])).toEqual({
			a: 1,
			b: { c: { d: [1, 2, 3] } }
		});
		await expect(mergeObjects([{ a: { a: 1 } }, { a: { b: 2 } }])).toEqual({
			a: {
				a: 1,
				b: 2
			}
		});
		await expect(mergeObjects([{ a: { a: 1 } }, { a: { a: 2 } }])).toEqual({
			a: {
				a: 2
			}
		});
	});
});
