<script>
	import { onMount } from 'svelte';
	import I18n from './I18n.svelte';

	let isFirefox = true;

	onMount(() => {
		isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
	});
</script>

{#if !isFirefox}
	<div class="hidden print:flex h-14 justify-between items-center px-2">
		<div class="flex flex-row justify-start items-center h-full gap-2">
			<img src="/assets/dloolLogo.svg" alt="Logo" title="Dlool" class="h-full object-contain" />
			<h3>Dlool</h3>
		</div>

		<p class="text-gray-600"><I18n key="printing.footer" /></p>
	</div>
{/if}
