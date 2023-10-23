<script lang="ts">
	import PrintingFooter from '$lib/PrintingFooter.svelte';
	import { network } from '../../routes/stores';
	import Contact from './Contact.svelte';
	import CopyRight from './CopyRight.svelte';
	import Links from './Links.svelte';

	export let height: number;
</script>

<footer
	bind:clientHeight={height}
	class="flex flex-col items-stretch gap-7 print:hidden m-0 px-6 py-4 bg-light-secondary dark:bg-dark-secondary pb-[calc(var(--navbar-height)+2rem)] md:pb-4"
>
	<div class="flex flex-col md:flex-row justify-start gap-7">
		<CopyRight />
		{#if $network === 'online'}
			<Contact />
		{/if}
	</div>
	<Links />
</footer>
<PrintingFooter />
