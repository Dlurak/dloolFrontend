<script lang="ts">
	import { i, type Token } from '../languages/i18n';
	import { currentLanguage } from '../routes/stores';

	export let key: Token | undefined = undefined;
	export let unsaveKey: string | undefined = undefined;
	export let parts: Record<string, string> = {};

	const getTranslation = () => {
		const isSaveKeyAvailable = key !== undefined;
		const isUnsaveKeyAvailable = unsaveKey !== undefined;

		if (isSaveKeyAvailable) return i(key as Token, parts as any);
		else if (isUnsaveKeyAvailable) return i(unsaveKey as Token, parts as any);
		else return '';
	};

	let string = getTranslation();

	currentLanguage.subscribe(() => (string = getTranslation()));
</script>

{#if string}
	{string}
{:else}
	{#key $currentLanguage}
		<slot />
	{/key}
{/if}
