import { languageShortcuts, type Languages } from '../languages/i18n';

const defaultLanguage: Languages = 'de';

export const load = ({ request }) => {
	const header = request.headers;
	const accpetedLanguages = header.get('accept-language') as string | null;
	if (!accpetedLanguages) return { requestLanguage: defaultLanguage };
	const possibilities = languageShortcuts.filter((i) => accpetedLanguages.indexOf(i) > -1);

	const sortedPossibilities = [...possibilities].sort((a, b) => {
		const indexA = accpetedLanguages.indexOf(a);
		const indexB = accpetedLanguages.indexOf(b);
		return indexA - indexB;
	});

	/**
	 * The language that should be used if no lang is specified in localstorage
	 * Defaults to German
	 */
	const lang = sortedPossibilities.length > 0 ? sortedPossibilities[0] : defaultLanguage;

	return {
		requestLanguage: lang
	} as const;
};
