import { attest, bench } from '@arktype/attest';
import { expect, test } from 'vitest';

test('basic setup', () => {
	expect(true).toBe(true);
});

type makeComplexType<s extends string> = s extends `${infer head}${infer tail}`
	? head | tail | makeComplexType<tail>
	: s;

test('basic attest setup', () => {
	attest<1>(1);
	attest<'1'>('1');

	bench('bench type', () => {
		return {} as makeComplexType<'defenestration'>;
	}).types([169, 'instantiations']);
});
