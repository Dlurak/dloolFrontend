export const isElementVisible = (element: HTMLElement, parentElement: HTMLElement): boolean => {
	const elementRect = element.getBoundingClientRect();
	const parentElementRect = parentElement.getBoundingClientRect();

	return elementRect.top >= parentElementRect.top && elementRect.bottom <= parentElementRect.bottom;
};
