type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type Eq<T, U> = T extends U ? true : false;
export type IfElse<T extends boolean, A, B> = T extends true ? A : B;
