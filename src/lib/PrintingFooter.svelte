<script>
	import { onMount } from 'svelte';
	import Logo from './Logo.svelte';

	let isFirefox = true;

	onMount(() => {
		isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
	});
</script>

{#if !isFirefox}
	<div
		class="hidden print:flex h-14 justify-between items-center px-2 outline outline-1 outline-red-200"
	>
		<div class="flex flex-row justify-start items-center h-full gap-2">
			<Logo />
			<h3>Dlool</h3>
		</div>

		<p class="text-gray-600">Your colloborative homeworkbook</p>
	</div>
{/if}
