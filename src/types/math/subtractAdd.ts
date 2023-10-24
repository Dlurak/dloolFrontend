// SUBTRACTION //

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
	? Acc
	: Enumerate<N, [...Acc, Acc['length']]>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type LastItem<T extends unknown[]> = T extends [...infer _, infer Last] ? Last : never;

type SubtractOne<N extends number> = LastItem<Enumerate<N>>;

// ADDITION //

type NthLastItem<T extends unknown[], N extends number> = N extends 0
	? never
	: T extends [...infer Rest, infer Last]
	? N extends 1
		? Last
		: NthLastItem<Rest, SubtractOne<N>>
	: never;

type SmallerNumber<N extends number> = N extends 0 ? 0 : N extends 1 ? 0 : Subtract<N, 2>;

type EnumerateBig<N extends number, Acc extends number[] = [1]> = SmallerNumber<
	Acc['length']
> extends N
	? Acc
	: EnumerateBig<N, [...Acc, Acc['length']]>;

type addOne<N extends number> = LastItem<EnumerateBig<N>>;

//--//--// FINAL TYPES //--//--//

export type Add<N extends number, M extends number> = M extends 0
	? N
	: N extends 0
	? M
	: Add<addOne<N>, Subtract<M, 1>>;

export type Subtract<N extends number, M extends number> = NthLastItem<Enumerate<N>, M>;
