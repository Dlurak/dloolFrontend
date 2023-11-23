<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { setBackendUrl } from '$lib/getBackendUrl';
	import { addToast } from '$lib/toast/addToast';
	import { i } from '../../languages/i18n';
	import { backendUrl } from '../../stores';

	let url = $backendUrl;

	backendUrl.subscribe((u) => (url = u));
</script>

<div
	class="w-full flex items-center justify-between flex-col @container @[32rem]/settings-slot:flex-row"
>
	<span class="flex items-center gap-1 font-bold w-full">
		<i class="bx bxs-server" />
		<I18n key="settings.api.base" />
	</span>
	<div class="flex gap-2 flex-col @[32rem]:flex-row @[32rem]:w-min w-full">
		<I18n>
			<input
				type="url"
				list="backend-list"
				bind:value={url}
				placeholder={i('settings.api.placeholder')}
				class="h-full bg-transparent inline-block px-4 py-2 rounded-md text-light-text dark:text-dark-text border-solid border-emerald-400 dark:border-emerald-700 border-2"
			/>
		</I18n>
		<datalist id="backend-list">
			<option value="https://dlool-backend.onrender.com"
				><I18n key="settings.api.preset.offical" /></option
			>
			<option value="http://localhost:3000"><I18n key="settings.api.preset.dev" /></option>
		</datalist>
		<button
			type="submit"
			class="flex items-center gap-2 justify-center rounded-md shadow-md bg-emerald-400 dark:bg-emerald-700 px-4 py-2"
			on:click={() => {
				setBackendUrl(url).then((positive) => {
					if (positive)
						addToast({
							content: 'settings.api.toast.success',
							type: 'success',
							duration: 5000
						});
					else
						addToast({
							content: 'settings.api.toast.error',
							type: 'error',
							duration: 5000
						});
				});
			}}
		>
			<i class="bx bx-save" />
			<I18n key="settings.api.submit" />
		</button>
	</div>
</div>
