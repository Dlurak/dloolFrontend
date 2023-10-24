export type Transformations = 'uppercase' | 'lowercase' | 'capitalize';
export type TransformResult<
	T extends string,
	Tr extends Transformations | undefined
> = Tr extends 'uppercase'
	? Uppercase<T>
	: Tr extends 'lowercase'
	? Lowercase<T>
	: Tr extends 'capitalize'
	? Capitalize<T>
	: T;

export const transform = <T extends string, Tr extends Transformations>(
	str: T,
	transform: Tr
): TransformResult<T, Tr> => {
	type TrRes = TransformResult<T, Tr>;
	if (transform === 'uppercase') return str.toUpperCase() as TrRes;
	else if (transform === 'lowercase') return str.toLowerCase() as TrRes;
	else return (str.charAt(0).toUpperCase() + str.slice(1)) as TrRes;
};

export const lowercase = <T extends string>(str: T): Lowercase<T> => transform(str, 'lowercase');
export const uppercase = <T extends string>(str: T): Uppercase<T> => transform(str, 'uppercase');
export const capitalize = <T extends string>(str: T): Capitalize<T> => transform(str, 'capitalize');
