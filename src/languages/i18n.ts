import { browser } from '$app/environment';
import { currentLanguage } from '../routes/stores';
import {
	slice,
	type ExtractWordsAfterDollarSign,
	type ReplaceSubstringType,
	type Result
} from '../types/i18n';
import de, { type DeStrings, type DeToken } from './de';
import type { EnStrings, EnToken } from './en';
import en from './en';

export const languages = {
	de: de,
	en: en
};
export const languageShortcuts = Object.keys(languages) as (keyof typeof languages)[];
export type Languages = keyof typeof languages;

export let lang: Languages = 'de';

currentLanguage.subscribe((value) => {
	lang = value;
});

export type Token = EnToken & DeToken;
export type Translations = EnStrings | DeStrings;

type GermanTranslation<T extends DeToken> = (typeof de)[T];
type EnglishTranslation<T extends EnToken> = (typeof en)[T];
export type T<Ty extends Token> = Ty extends Token
	? GermanTranslation<Ty> | EnglishTranslation<Ty>
	: never;

type Transformations = 'uppercase' | 'lowercase' | 'capitalize';

interface I18nProps {
	transform?: Transformations;
	maxLength?: number;
}

/**
 * A function to get the i18n version of a string
 * @param key The key of the translation
 * @returns A translation
 */
export const i = <
	Tok extends Token,
	Par extends Record<ExtractWordsAfterDollarSign<T<Tok>>, string>,
	Opt extends I18nProps
>(
	key: Tok,
	parts: Par = {} as Par,
	options: Opt = {} as Opt
) => {
	type LiteralTypes<T> = {
		[K in keyof T]: T[K];
	};

	const baseString = languages[lang][key] as T<typeof key>;

	let unPartedString: string = baseString;

	const partKeys = Object.keys(parts) as ExtractWordsAfterDollarSign<T<typeof key>>[];
	partKeys.forEach((part) => {
		unPartedString = unPartedString.replace(`$${part}`, parts[part]);
	});

	const unTransformedString = unPartedString as ReplaceSubstringType<
		T<typeof key>,
		LiteralTypes<Par>
	>;
	const string = options.maxLength
		? slice(unTransformedString, options.maxLength)
		: unTransformedString;
	type UnTransformed = typeof string;

	if (options.transform) {
		switch (options.transform) {
			case 'uppercase':
				return string.toUpperCase() as Uppercase<UnTransformed>;
			case 'lowercase':
				return string.toLowerCase() as Lowercase<UnTransformed>;
			case 'capitalize':
				return (string.charAt(0).toUpperCase() + string.slice(1)) as Capitalize<UnTransformed>;
		}
	}

	return string;
};

export const switchLanguage = (language: Languages) => {
	currentLanguage.set(language);
	if (browser) localStorage.setItem('language', language);
};
