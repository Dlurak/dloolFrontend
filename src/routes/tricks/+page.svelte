<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { title } from '../../stores';
	import Download from '$lib/tricks/Download.svelte';
	import Export from '$lib/tricks/Export.svelte';

	title.set('tricks');
</script>

<div class="flex gap-4 flex-col">
	<Export />
	<hr />
	<div>
		<h2 id="install"><I18n key="tricks.install" /></h2>
		<p>
			<I18n key="tricks.install.text" />
		</p>
	</div>
	<hr />
	<Download />
</div>
