export function swapArrayElements<T>(arr: T[], index1: number, index2: number): T[] {
	const newArray = [...arr];

	// Swap the elements at index1 and index2 in the new array
	[newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
	return newArray;
}
