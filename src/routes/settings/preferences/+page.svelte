<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import NavigationItems from '$lib/preferences/NavigationItems.svelte';
	import TextInNav from '$lib/preferences/TextInNav.svelte';
	import Theme from '$lib/preferences/Theme.svelte';
	import ChangeHomeworkOpacity from '$lib/preferences/ChangeHomeworkOpacity.svelte';
	import HomeworkPerPage from '$lib/preferences/HomeworkPerPage.svelte';
	import Presets from '$lib/preferences/Presets.svelte';
</script>

<div>
	<section>
		<h3><I18n key="settings.apperance" /></h3>
		<div class="flex flex-col gap-4">
			<Theme />
			<section class="flex flex-col gap-4">
				<h4><I18n key="settings.apperance.nav" /></h4>
				<TextInNav />
				<NavigationItems />
			</section>
			<section class="flex flex-col gap-4">
				<h4><I18n key="homework" /></h4>
				<ChangeHomeworkOpacity />
				<HomeworkPerPage />
				<Presets />
			</section>
		</div>
	</section>
</div>
