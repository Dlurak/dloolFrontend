import type { Subtract } from '../math/subtractAdd';

type FirstNStringCharsBase<T extends string, N extends number> = N extends 0
	? ''
	: T extends `${infer Char}${infer Rest}`
	? `${Char}${FirstNStringChars<Rest, Subtract<N, 1>>}`
	: never;

export type FirstNStringChars<T extends string, N extends number | undefined> = N extends number
	? FirstNStringCharsBase<T, N>
	: T;
export const slice = <T extends string, N extends number>(str: T, n: N): FirstNStringChars<T, N> =>
	str.slice(0, n) as FirstNStringChars<T, N>;
