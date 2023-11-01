<script>
	import { onMount } from 'svelte';
	import { settings } from '../../routes/stores';
	import { getLocalstorage } from '$lib/localstorage';

	onMount(() => {
		settings.update((s) => {
			s.showTextInNavbar = getLocalstorage('textInNav', true);
			s.showSearchInNavbar = getLocalstorage('searchInNav', false);
			return s;
		});
	});
</script>
