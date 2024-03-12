<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import type { Token } from '../../languages/i18n';

	export let emoji: string;
	export let title: Token;
	export let description: Token;

	export let disfoccused = false;
</script>

<div
	class="print:shadow-none h-full bg-black bg-opacity-20 hover:scale-[1.01] shadow-md hover:shadow-lg transition-all rounded-md p-5 flex flex-col"
	class:scale-95={disfoccused}
	class:brightness-50={disfoccused}
>
	<div class="py-2 print:hidden">
		<span class="rounded-sm bg-black text-xl bg-opacity-20 p-2">{emoji}</span>
	</div>
	<h3><I18n key={title} /></h3>
	<I18n key={description} />
</div>
