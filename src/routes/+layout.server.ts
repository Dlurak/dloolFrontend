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

	const preferedLanguageAvaliable = sortedPossibilities.length > 0;

	/**
	 * The language that should be used if no lang is specified in localstorage
	 * Defaults to German
	 */
	const lang = preferedLanguageAvaliable ? sortedPossibilities[0] : defaultLanguage;

	const favLang = accpetedLanguages
		.split(';')
		.map((x) => x.split(','))
		.flat()
		.map((x) => x.split('-'))
		.flat()[0];

	return {
		requestLanguage: lang,
		favouriteLanguage: favLang,
		preferedLanguageAvaliable
	} as const;
};
