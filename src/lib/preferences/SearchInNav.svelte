<script lang="ts">
	import NavigationButton from './navigation/NavigationButton.svelte';

	type Button = {
		id: string;
		xOffset: number;
		isDragged: boolean;
		boxIcon: string;
	};

	let items = [
		{ id: 'login', xOffset: 0, isDragged: false, boxIcon: 'bx-user' },
		{ id: 'homework', xOffset: 0, isDragged: false, boxIcon: 'bx-book' },
		{ id: 'events', xOffset: 0, isDragged: false, boxIcon: 'bx-calendar' },
		{ id: 'notes', xOffset: 0, isDragged: false, boxIcon: 'bx-notepad' },
		{ id: 'search', xOffset: 0, isDragged: false, boxIcon: 'bx-search' }
	] satisfies Button[];
</script>

<div>
	<ul
		class="w-full justify-evenly flex gap-2 list-none bg-light-box dark:bg-dark-box bg-opacity-50 rounded-lg py-2 px-1"
		on:dragover={(e) => {
			e.preventDefault();

			const draggedElement = items.find((i) => i.isDragged);
			if (!draggedElement) return;

			draggedElement.xOffset = e.clientX;
			items = items.sort((a, b) => a.xOffset - b.xOffset);
		}}
	>
		{#each items as item, index}
			<NavigationButton
				bind:xCoord={items[index].xOffset}
				bind:isDragged={items[index].isDragged}
				on:dragend={() => {
					items = items.map((it) => ({
						...it,
						isDragged: false
					}));
				}}
				icon={item.boxIcon}
			/>
		{/each}
	</ul>
</div>
