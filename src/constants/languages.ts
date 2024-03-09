import type { Languages } from '../languages/i18n';
import type { Eq, IfElse } from '../types/utils';

type TranslationRecord = Record<Languages, string>;

const languageShortcuts = {
	fr: {
		de: 'Französisch',
		en: 'French'
	} as const,
	ru: {
		de: 'Russisch',
		en: 'Russian'
	} as const,
	es: {
		de: 'Spanisch',
		en: 'Spanish'
	} as const,
	pt: {
		de: 'Portugiesisch',
		en: 'Portugese'
	} as const,
	zh: {
		de: 'Chinesisch',
		en: 'Chinese'
	} as const,
	ar: {
		de: 'Arabisch',
		en: 'Arabic'
	} as const,
	hi: {
		de: 'Hindi',
		en: 'Hindi'
	} as const,
	bn: {
		de: 'Bengali',
		en: 'Bengali'
	} as const,
	ja: {
		de: 'Japanisch',
		en: 'Japanese'
	} as const,
	ko: {
		de: 'Koreanisch',
		en: 'Korean'
	} as const,
	it: {
		de: 'Italienisch',
		en: 'Italian'
	} as const,
	nl: {
		de: 'Niederländisch',
		en: 'Dutch'
	} as const,
	cs: {
		de: 'Tschechisch',
		en: 'Czech'
	} as const,
	sl: {
		de: 'Slowenisch',
		en: 'Slovenian'
	} as const,
	af: {
		de: 'Afrikaans',
		en: 'Afrikaans'
	} as const,
	la: {
		de: 'Latein',
		en: 'Latin'
	} as const,
	da: {
		de: 'Dänisch',
		en: 'Danish'
	} as const,
	eo: {
		de: 'Esperanto',
		en: 'Esperanto'
	} as const,
	et: {
		de: 'Estnisch',
		en: 'Estonian'
	} as const,
	el: {
		de: 'Griechisch',
		en: 'Greek'
	} as const,
	is: {
		de: 'Isländisch',
		en: 'Icelandic'
	} as const,
	tlh: {
		de: 'Klingonisch',
		en: 'Klingon'
	} as const,
	ab: {
		de: 'Abchasisch',
		en: 'Abkhazian'
	} as const,
	ach: {
		de: 'Acholi',
		en: 'Acholi'
	} as const,
	sq: {
		de: 'Albanisch',
		en: 'Albanian'
	} as const,
	na: {
		de: 'Nauranisch',
		en: 'Nauruan'
	} as const,
	ne: {
		de: 'Nepali',
		en: 'Nepali'
	} as const,
	mm: {
		de: 'Mongolisch',
		en: 'Mongolian'
	} as const,
	iu: {
		de: 'Inukitut',
		en: 'Inuktitut'
	} as const,
	kl: {
		de: 'Grönländisch',
		en: 'Greenlandic'
	} as const,
	fi: {
		de: 'Finnisch',
		en: 'Finnish'
	} as const,
	fj: {
		de: 'Fidschi',
		en: 'Fijian'
	} as const,
	zu: {
		de: 'Zulu',
		en: 'Zulu'
	} as const,
	vi: {
		de: 'Vientamesisch',
		en: 'Vietnamese'
	} as const,
	ur: {
		de: 'Urdu',
		en: 'Urdu'
	} as const,
	uk: {
		de: 'Ukrainisch',
		en: 'Ukrain'
	} as const,
	bg: {
		de: 'Bulgarisch',
		en: 'Bulgarian'
	} as const
} satisfies Record<string, TranslationRecord>;

export type LanguageShortcut = keyof typeof languageShortcuts;

type Values<T> = T[keyof T];
type Language<T extends LanguageShortcut> = Values<(typeof languageShortcuts)[T]>;

type GetLang<T extends string> = T extends LanguageShortcut ? Language<T> : undefined;

/**
 * A function to get the long version of a language name from the short one
 *
 * @example
 * getLanguageShortcut('ja', 'de') === 'Japanisch'
 */
export const getLanguageShortcut = <T extends string>(
	shortcut: T,
	currentLanguage: Languages
): GetLang<T> => {
	// @ts-expect-error Using this as index will either give a object or undefined so
	const subObj = languageShortcuts[shortcut] as Language<T> | undefined;
	// @ts-expect-error The return type includes undefined, but only as an option
	if (!subObj) return undefined;

	// @ts-expect-error  subjObj is of type `{}`
	return subObj[currentLanguage];
};
