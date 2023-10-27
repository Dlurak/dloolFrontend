import type { IntRange } from '../../types/utils';

export const hexToRgb = (
	hex: string
): {
	r: IntRange<0, 255>;
	g: IntRange<0, 255>;
	b: IntRange<0, 255>;
} => ({
	r: parseInt(hex.slice(1, 3), 16) as IntRange<0, 255>,
	g: parseInt(hex.slice(3, 5), 16) as IntRange<0, 255>,
	b: parseInt(hex.slice(5, 7), 16) as IntRange<0, 255>
});
