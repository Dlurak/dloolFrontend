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
