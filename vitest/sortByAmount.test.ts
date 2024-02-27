import { expect, describe, it } from 'vitest';
import { sortByAmount } from '../src/lib/utils/arrays/sort';

describe('sort by amount', () => {
	it('works with an equal amount of items', () => {
		const original1 = ['hi', 'hello', 'hallo'];
		expect(sortByAmount(original1)).toEqual(['hallo', 'hello', 'hi']);

		const original2 = ['hi', 'hello', 'hallo', 'hi', 'hello', 'hallo'];
		expect(sortByAmount(original2)).toEqual(['hallo', 'hello', 'hi']);
	});

	it('works', () => {
		const original = [
			'user1',
			'user2',
			'user2',
			'user2',
			'user2',
			'user3',
			'user1',
			'user1',
			'user2',
			'user3',
			'user1'
		];

		expect(sortByAmount(original)).toEqual(['user2', 'user1', 'user3']);
	});
});
