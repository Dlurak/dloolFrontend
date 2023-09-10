<script lang="ts">
	import NoteBox from '$lib/notes/NoteBox.svelte';
	import type { NoteResponse } from '../../types/notes';

	export let data: NoteResponse | { noteDataAvailable: false };
</script>

{#if data.noteDataAvailable}
	<ul class="flex flex-col gap-2">
		{#each data.data.notes as note}
			<li>
				<NoteBox {note} />
			</li>
		{/each}
	</ul>
{:else}
	<p>A error occured</p>
{/if}
