<script lang="ts">
	import { i, type I18nProps, type Token, type TPar } from '../languages/i18n';
	import { currentLanguage } from '../stores';

	export let key: Token | undefined = undefined;

	type TPartsSvelte<T extends Token | undefined> = T extends Token ? TPar<T> : never;
	export let parts: TPartsSvelte<typeof key> = {};

	export let options: I18nProps = {};

	const getTranslation = () => {
		if (key === undefined) return '';
		else {
			return i(key, parts, options);
		}
	};

	let string = getTranslation();

	currentLanguage.subscribe(() => (string = getTranslation()));
</script>

{#key $currentLanguage}
	<slot>
		{string}
	</slot>
{/key}
