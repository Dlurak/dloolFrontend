<script lang="ts">
	export let iconName: string;
	export let focusedIconName = iconName;
	export let color = '';
	export let onClick: (e: Event) => void = () => {
		return;
	};
	export let disabled = false;

	let icon = iconName;

	let isFocused = false;
</script>

<button
	class="print:hidden p-3 bx {icon} {color} disabled:opacity-50 disabled:cursor-not-allowed"
	type="button"
	{disabled}
	on:focus={() => {
		isFocused = true;
		icon = focusedIconName;
	}}
	on:blur={() => {
		isFocused = false;
		icon = iconName;
	}}
	on:click={onClick}
/>
