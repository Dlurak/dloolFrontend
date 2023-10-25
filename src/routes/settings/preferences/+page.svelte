<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import TextInNav from '$lib/preferences/TextInNav.svelte';
	import Theme from '$lib/preferences/Theme.svelte';
</script>

<div>
	<section>
		<h3><I18n key="settings.apperance" /></h3>
		<div class="flex flex-col gap-4">
			<Theme />
			<TextInNav />
		</div>
	</section>
</div>
