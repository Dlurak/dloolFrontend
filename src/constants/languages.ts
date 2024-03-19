import type { Languages } from '../languages/i18n';
import { languageShortcuts } from 'iso-langs';

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
