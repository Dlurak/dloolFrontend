import type { Languages } from '../languages/i18n';

type TranslationRecord = Record<Languages, string>;

const languageShortcuts: Record<string, TranslationRecord> = {
	fr: {
		de: 'Französisch',
		en: 'French'
	},
	ru: {
		de: 'Russisch',
		en: 'Russian'
	},
	es: {
		de: 'Spanisch',
		en: 'Spanish'
	},
	pt: {
		de: 'Portugiesisch',
		en: 'Portugese'
	},
	zh: {
		de: 'Chinesisch',
		en: 'Chinese'
	},
	ar: {
		de: 'Arabisch',
		en: 'Arabic'
	},
	hi: {
		de: 'Hindi',
		en: 'Hindi'
	},
	bn: {
		de: 'Bengali',
		en: 'Bengali'
	},
	ja: {
		de: 'Japanisch',
		en: 'Japanese'
	},
	ko: {
		de: 'Koreanisch',
		en: 'Korean'
	},
	it: {
		de: 'Italienisch',
		en: 'Italian'
	},
	nl: {
		de: 'Niederländisch',
		en: 'Dutch'
	},
	cs: {
		de: 'Tschechisch',
		en: 'Czech'
	},
	sl: {
		de: 'Slowenisch',
		en: 'Slovenian',
	},
	af: {
		de: 'Afrikaans',
		en: 'Afrikaans',
	},
	la: {
		de: 'Latein',
		en: 'Latin'
	},
	da: {
		de: 'Dänisch',
		en: 'Danish',
	},
	eo: {
		de: 'Esperanto',
		en: 'Esperanto',
	},
	et: {
		de: 'Estnisch',
		en: 'Estonian',
	},
	el: {
		de: 'Griechisch',
		en: 'Greek',
	},
	is: {
		de: 'Isländisch',
		en: 'Icelandic',
	}
} as const;

/**
 * A function to get the long version of a language name from the short one
 *
 * @example
 * getLanguageShortcut('ja', 'de') === 'Japanisch'
 */
export const getLanguageShortcut = (shortcut: string, currentLanguage: Languages) => {
	const subObj = languageShortcuts[shortcut] as TranslationRecord | undefined;
	if (!subObj) return undefined;

	return subObj[currentLanguage];
};
