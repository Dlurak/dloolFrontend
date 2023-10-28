import type { RGB, RangeRGB } from '../../types/subjectColors';
import { rgbSchema } from '../../zod/subjectColor';

export const hexToRgb = (hex: string): RGB | null => {
	if (!/^#[0-9a-f]{6}$/i.test(hex)) {
		return null;
	}
	return {
		r: parseInt(hex.slice(1, 3), 16) as RangeRGB,
		g: parseInt(hex.slice(3, 5), 16) as RangeRGB,
		b: parseInt(hex.slice(5, 7), 16) as RangeRGB
	};
};

const makeHex = (n: number): string => n.toString(16).padStart(2, '0');

export const rgbToHex = (r: RangeRGB, g: RangeRGB, b: RangeRGB): string | null => {
	const result = rgbSchema.safeParse({ r, g, b });
	if (!result.success) return null;

	return `#${makeHex(r)}${makeHex(g)}${makeHex(b)}`;
};
