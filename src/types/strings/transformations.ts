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
	if (transform === 'uppercase') return str.toUpperCase() as any;
	else if (transform === 'lowercase') return str.toLowerCase() as any;
	else return (str.charAt(0).toUpperCase() + str.slice(1)) as any;
};
