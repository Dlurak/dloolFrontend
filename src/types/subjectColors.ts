import type { IntRange } from './utils';

type RangeRGB = IntRange<0, 255>;

export type RGB = {
	r: RangeRGB;
	g: RangeRGB;
	b: RangeRGB;
};

export type SubjectColor = {
	subject: string;
	color: RGB;
};
