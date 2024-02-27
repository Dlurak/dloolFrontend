export const sortByDifferentArray = <T>(
	array: T[],
	order: unknown[],
	predicate: (item: T) => unknown
) => {
	return array.sort((a, b) => {
		const indexA = order.indexOf(predicate(a));
		const indexB = order.indexOf(predicate(b));

		// this pushs things that aren't included to the end
		if (indexA === -1) return Infinity;
		if (indexB === -1) return -Infinity;

		return indexA - indexB;
	});
};

const countAmount = (array: string[]) => {
	const countMap: Record<string, number> = {};

	for (const i of array) {
		const oldValue = countMap[i] || 0;

		countMap[i] = oldValue + 1;
	}

	return countMap;
};

export const sortByAmount = (array: string[]) => {
	const object = countAmount(array);
	const entries = Object.entries(object);
	const sorted = entries.sort((a, b) => a[1] - b[1]).reverse();
	return sorted.map(([s]) => s);
};
