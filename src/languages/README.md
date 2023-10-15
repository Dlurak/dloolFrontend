# Translations

This directory contains the translations of the user interface of the application.

## How to add a new language

1. Copy the file `en.ts` and rename it to the [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) of the language you want to add.
2. Rename everything from en to your code in the new file.
   So In the first line `const en = {` becomes `const de = {` for German.
   And then the first code block to the second

   ```typescript
   export type EnToken = keyof typeof en;
   export type EnStrings = (typeof en)[EnToken];

   export default en;
   ```

   becomes

   ```typescript
   export type DeToken = keyof typeof de;
   export type DeStrings = (typeof de)[DeToken];

   export default de;
   ```

3. Translate all the strings in the constanst at the top of the file.
   **Do not translate the keys!**
4. Import the new types and the new language in `i18n.ts`. Like in this codeblock:
   ```typescript
   import de, { type DeStrings, type DeToken } from './de';
   ```
5. Add the new languages object to the `languages` object in `i18n.ts` like this:
   ```typescript
   const languages = {
   	en,
   	de
   };
   ```
6. Add the new language and it's type everywhere where the other languages are used.
   Like in this codeblock:

   ```typescript
   export type Token = EnToken & DeToken;
   export type Translations = EnStrings | DeStrings;

   type GermanTranslation<T extends DeToken> = (typeof de)[T];
   type EnglishTranslation<T extends EnToken> = (typeof en)[T];
   export type T<Ty extends Token> = Ty extends Token
   	? GermanTranslation<Ty> | EnglishTranslation<Ty>
   	: never;
   ```

7. Add the new language to the `languagesObj` in the `src/lib/LanguageSwitcher.svelte` component.
   Like in this codeblock:
   ```typescript
   let languagesObj: Record<Languages, string> = {
   	en: 'English',
   	de: 'Deutsch'
   };
   ```

## How to use the translations

It is recommended to use the `I18n` component to translate your text. It has the parameter key which is the key of the string you want to translate. And the parameter parts which is an object with the parts of the string.  
`key` is already typed so you get autocompletion for the keys. Only the keys that are available in all languages are available for autocompletion. If you want to use a key that is only available in one language you have to use the `unsaveKey` parameter. This will disable the autocompletion for the key.  
Eventhough generally there is a type for the parts of the string, the component isn't using it yet, this will change in the future. So you have to make sure that the parts are correct yourself.  
The I18n component will rerun when the language changes. So you don't have to worry about that, but you have to make sure that you don't put heavy calculations or api calls in the I18n component because it will rerun every time the language changes.

If you can't use the component for any reason there is the `i` function. It takes the key as the first parameter and the parts as the second parameter. Some advanced functionallities are avaliable as a third parameter, currently only text-transformation. The function returns the translated string. It won't rerun when the language changes. So you have to make sure that you rerun it yourself when the language changes, e.g. by putting it into a `I18n` component. The parts of this function **are** typed, so you get autocompletion for them.

## Use this system in your own project

My i18n system has many great features and is relativly easo to use here are some features:

- SSR
- Excellent TypeScript support
- State doesn't get lost when the language changes
- Text transformation
- The language will be stored in local storage

I plan on extracting my system to a own library but currently it is hard baked into Dlool.  
While it requires a bit of work to initialize it, and it requires a bit of work to add a language, the advantages are worth it.
