export function mergeObjects(objs: object[]) {
	const result: Record<string, unknown> = {};

	for (const obj of objs) {
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const value: unknown = (obj as any)[key];

				if (typeof value === 'object' && !Array.isArray(value))
					result[key] = mergeObjects([result[key] as object, value as object]);
				else result[key] = value;
			}
		}
	}

	return result;
}
