<script>
	import I18n from '$lib/I18n.svelte';
	import { title } from '../stores';

	title.set('settings');
</script>

<div class="h-full flex justify-center items-center">
	<p><I18n key="settings.selectSpecificSection" /></p>
</div>
