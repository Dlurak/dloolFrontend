import type { IntRange } from './utils';

export type RangeRGB = IntRange<0, 256>;

export type RGB = {
	r: RangeRGB;
	g: RangeRGB;
	b: RangeRGB;
};

export type SubjectColor = {
	subject: string;
	color: RGB;
};
