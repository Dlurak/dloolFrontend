<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Token } from '../../../languages/i18n';
	import I18n from '$lib/I18n.svelte';

	const dispatch = createEventDispatcher();

	export let link: {
		id: number;
		title: Token;
		description: Token;
		path: string;
		bxIcon: string;
		matchingWord: string;
	};
	export let isFocused: boolean;
</script>

<a
	href={link.path}
	class=" flex items-center gap-2 px-3 py-1 text-light-text dark:text-dark-text focus:outline-none focus:border-none"
	class:bg-gray-400={isFocused}
	class:dark:bg-gray-500={isFocused}
	class:shadow-sm={isFocused}
	on:click={() => dispatch('close')}
	on:mouseenter={() => dispatch('focus', link.id)}
	on:focus={() => dispatch('focus', link.id)}
>
	<i class="bx {link.bxIcon}  flex text-xl" />
	<div class="w-full">
		<h4 class="line-clamp-1"><I18n key={link.title} /></h4>
		<p
			class="line-clamp-1 text-sm"
			class:text-gray-600={!isFocused}
			class:dark:text-gray-400={!isFocused}
		>
			<I18n key={link.description} />
		</p>
	</div>
	<span class="rounded-sm bg-gray-300 dark:bg-gray-600 px-2 py-1 capitalize empty:hidden">
		{link.matchingWord}
	</span>
</a>
