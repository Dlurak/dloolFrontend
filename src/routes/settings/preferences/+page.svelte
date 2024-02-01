<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import SearchInNav from '$lib/preferences/SearchInNav.svelte';
	import TextInNav from '$lib/preferences/TextInNav.svelte';
	import Theme from '$lib/preferences/Theme.svelte';
	import ChangeHomeworkOpacity from '$lib/preferences/ChangeHomeworkOpacity.svelte';
</script>

<div>
	<section>
		<h3><I18n key="settings.apperance" /></h3>
		<div class="flex flex-col gap-4">
			<Theme />
			<section class="flex flex-col gap-4">
				<h4><I18n key="settings.apperance.nav" /></h4>
				<TextInNav />
				<SearchInNav />
			</section>
			<section class="flex flex-col gap-4">
				<h4><I18n key="homework" /></h4>
				<ChangeHomeworkOpacity />
			</section>
		</div>
	</section>
</div>
