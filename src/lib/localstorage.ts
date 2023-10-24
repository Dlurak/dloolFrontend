export function setLocalstorageString<T extends string>(key: string, value: T): boolean {
	if (typeof window === 'undefined') return false;

	window.localStorage.setItem(key, value);
	return true;
}

export function getLocalstorageString<T extends string>(key: string, fallback: T): T {
	if (typeof window === 'undefined') return fallback;

	const value = window.localStorage.getItem(key);
	if (value === null) return fallback;
	return value as T;
}
