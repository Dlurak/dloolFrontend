import { expect, describe, it } from 'vitest';
import { sortByDifferentArray } from '../src/lib/utils/arrays/sort';

describe('sort by different array', () => {
	it('should sort an array based on a different array order', () => {
		const names = ['max', 'john', 'mary'];
		const people = [{ name: 'max' }, { name: 'tim' }, { name: 'mary' }, { name: 'john' }];

		const sortedPeople = sortByDifferentArray(people, names, (p) => p.name);

		expect(sortedPeople.map((p) => p.name)).toEqual(['max', 'john', 'mary', 'tim']);
	});

	it('should sort an array of numbers based on a different array order', () => {
		const numbers = [5, 2, 1, 8, 1];
		const order = [1, 8, 5, 2];

		const sortedNumbers = sortByDifferentArray(numbers, order, (n) => n);

		expect(sortedNumbers).toEqual([1, 1, 8, 5, 2]);
	});

	it('preserves the original order when the new order is empty', () => {
		const items = ['Dlool', 'Svelte', 'TypeScript'];
		const order = [];

		const sorted = sortByDifferentArray(items, order, (n) => n);
		expect(sorted).toEqual(items);
	});
});
