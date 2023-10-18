<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let iconName: string;
	export let focusedIconName = iconName;
	export let color = '';
	export let disabled = false;

	export let title: string | undefined = undefined;

	let icon = iconName;

	const dispatch = createEventDispatcher();
</script>

<button
	class="print:hidden p-3 bx {icon} {color} disabled:opacity-50 disabled:cursor-not-allowed"
	type="button"
	{title}
	{disabled}
	on:focus={() => {
		icon = focusedIconName;
	}}
	on:blur={() => {
		icon = iconName;
	}}
	on:click={(e) => {
		if (disabled) return;
		dispatch('click', e);
	}}
/>
