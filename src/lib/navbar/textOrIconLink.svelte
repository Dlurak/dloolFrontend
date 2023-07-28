<script lang="ts">
	export let show = true;

	export let uri: string;
	export let boxIcon: string;
	export let title: string;
</script>

{#if show}
	<a href={uri} {title}>
		{#if boxIcon}
			<i class="bx {boxIcon}" />
		{:else}
			{title}
		{/if}
	</a>
{/if}
