type Primitives = string | boolean | number;

type NestedObject<FinalValue extends Primitives, Keys extends string[]> = Keys extends [
	infer FirstKey,
	...infer RestKeys
]
	? FirstKey extends string
		? RestKeys extends string[]
			? Record<FirstKey, NestedObject<FinalValue, RestKeys>>
			: never
		: never
	: Record<string, unknown>;

export const setNestedProperty = <V extends Primitives, K extends string[]>(
	keys: K,
	value: V
): NestedObject<V, K> => {
	// any makes it waaaaaay easier to work with
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const obj: Record<string, any> = {};
	let currentObj = obj;

	if (keys.length === 0) return value as unknown as NestedObject<V, K>;

	for (const key of keys) {
		if (!currentObj[key] || typeof currentObj[key] !== 'object') currentObj[key] = {};

		const isLastKey = keys[keys.length - 1] === key;
		if (isLastKey) break;

		currentObj = currentObj[key];
	}

	currentObj[keys[keys.length - 1]] = value;

	return obj as unknown as NestedObject<V, K>;
};
