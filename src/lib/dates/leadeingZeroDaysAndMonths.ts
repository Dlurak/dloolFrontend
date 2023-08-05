export function leadingZeroDaysAndMonths(n: number) {
	return `${n < 10 ? 0 : ''}${n}`;
}
