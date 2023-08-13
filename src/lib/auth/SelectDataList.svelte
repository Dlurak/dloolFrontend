<script lang="ts">
	export let id: string;
	export let loadFunction: (param: string) => Promise<{ name: string }[]>;
	export let searchParam: string;
</script>

{#await loadFunction(searchParam) then data}
	{#if data}
		<datalist {id}>
			{#each data as item}
				<option value={item.name} />
			{/each}
		</datalist>
	{/if}
{/await}
