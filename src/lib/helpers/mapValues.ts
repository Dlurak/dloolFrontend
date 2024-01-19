type ObjectOf<T> = Record<string | number | symbol, T>;

/**
 * Map over the values of an object, returning a new object with the same keys
 * and mapped values.
 */
export const mapValues = <T, U>(object: ObjectOf<T>, fn: (value: T) => U) => {
	// iterate over the keys of the object
	const newObject: ObjectOf<U> = {};
	for (const key of Object.keys(object)) {
		const mappedValue = fn(object[key]);
		newObject[key] = mappedValue;
	}
	return newObject;
};
