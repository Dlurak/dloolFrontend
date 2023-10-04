<script>
	import I18n from '$lib/I18n.svelte';
	import { title } from './stores';

	title.set('home');
</script>

<h1><I18n key="welcome" /></h1>
<p><I18n key="homeDummytext" /></p>
