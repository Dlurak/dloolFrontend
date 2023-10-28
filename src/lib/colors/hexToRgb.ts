import type { IntRange } from '../../types/utils';

type Range = IntRange<0, 255>;

export const hexToRgb = (
	hex: string
): {
	r: Range;
	g: Range;
	b: Range;
} => ({
	r: parseInt(hex.slice(1, 3), 16) as Range,
	g: parseInt(hex.slice(3, 5), 16) as Range,
	b: parseInt(hex.slice(5, 7), 16) as Range
});

// create a function to make any decimal number a hex number with 2 digits
const makeHex = (n: number): string => n.toString(16).padStart(2, '0');

export const rgbToHex = (r: Range, g: Range, b: Range): string =>
	`#${makeHex(r)}${makeHex(g)}${makeHex(b)}`;
