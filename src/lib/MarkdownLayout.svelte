<script lang="ts">
    export let title: string | undefined;
	export let author: string | undefined;
</script>

<svelte:head>
	<title>Dlool | Documentation{title ? ` | ${title}` : ''}</title>
</svelte:head>

<slot />

<div class="pt-6">
	{#if author}
		<span>
			<i class="bx bx-user" />
			{author}
		</span>
	{/if}
</div>
