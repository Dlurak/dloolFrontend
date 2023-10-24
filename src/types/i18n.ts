import type { T } from '../languages/i18n';

type AddSpaces<T extends string> = ` ${T} `;
type Trimmed<T extends string> = T extends `${' ' | '\t' | '\n'}${infer R}`
	? Trimmed<R>
	: T extends `${infer L}${' ' | '\t' | '\n'}`
	? Trimmed<L>
	: T;

type ExtractWordsAfterDollarSignBase<
	T extends string,
	Acc extends string[] = []
> = T extends `${infer _}$${infer Rest} ${infer R}`
	? ExtractWordsAfterDollarSignBase<R, [...Acc, Rest]>
	: Acc;

export type ExtractWordsAfterDollarSign<T extends string> = ExtractWordsAfterDollarSignBase<
	AddSpaces<T>
>[number];

type ReplaceSubstringTypeBase<
	T extends string,
	R extends Record<ExtractWordsAfterDollarSign<T>, string>
> = T extends `${infer Before}$${infer Key} ${infer After}`
	? // Before is the part of the string before the $Key
	  // After is the part of the string after the $Key
	  // Check if the key after the dollar sign is in the record
	  Key extends keyof R
		? // If the key is in the record, replace it
		  `${Before}${R[Key]} ${ReplaceSubstringType<After, R>}`
		: // If the key is not in the record, keep the $Key
		  `${Before}$${Key} ${ReplaceSubstringType<After, R>}`
	: // When there is no more $ in the string, we are done
	  T;

export type ReplaceSubstringType<
	T extends string,
	R extends Record<ExtractWordsAfterDollarSign<T>, string>
> = Trimmed<ReplaceSubstringTypeBase<AddSpaces<T>, R>>;

type Transformations = 'uppercase' | 'lowercase' | 'capitalize' | undefined;
export type Result<T extends string, Tr extends Transformations> = Tr extends 'uppercase'
	? Uppercase<T>
	: Tr extends 'lowercase'
	? Lowercase<T>
	: Tr extends 'capitalize'
	? Capitalize<T>
	: T;
