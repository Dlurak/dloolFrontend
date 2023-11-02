<script>
	import { onMount } from 'svelte';
	import { backendUrl, settings } from '../../stores';
	import { getLocalstorage, getLocalstorageString } from '$lib/localstorage';
	import { PUBLIC_API_URL } from '$env/static/public';

	onMount(() => {
		settings.update((s) => {
			s.showTextInNavbar = getLocalstorage('textInNav', true);
			s.showSearchInNavbar = getLocalstorage('searchInNav', false);
			return s;
		});

		backendUrl.set(getLocalstorageString('backendUrl', PUBLIC_API_URL));
	});
</script>
