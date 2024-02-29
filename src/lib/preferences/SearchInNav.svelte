<script lang="ts">
	import { localstorage } from 'svocal';
	import NavigationButton from './navigation/NavigationButton.svelte';
	import { SvocalKeys } from '../../enums/svocal';
	import { sortByDifferentArray } from '$lib/utils/arrays/sort';
	import { browser } from '$app/environment';
	import type { Id } from '../../constants/navbar';

	type Button = {
		id: Id;
		xOffset: number;
		isDragged: boolean;
		boxIcon: string;
	};

	const usedIdsSvocal = localstorage<Id[]>(SvocalKeys.NAVBAR_IDS, [
		'login',
		'homework',
		'events',
		'notes'
	]);

	const allItems: Button[] = [
		{ id: 'login', xOffset: 0, isDragged: false, boxIcon: 'bx-user' },
		{ id: 'homework', xOffset: 0, isDragged: false, boxIcon: 'bx-book' },
		{ id: 'events', xOffset: 0, isDragged: false, boxIcon: 'bx-calendar' },
		{ id: 'notes', xOffset: 0, isDragged: false, boxIcon: 'bx-notepad' },
		{ id: 'search', xOffset: 0, isDragged: false, boxIcon: 'bx-search' }
	];

	let items = sortByDifferentArray(
		allItems.filter(({ id }) => $usedIdsSvocal.includes(id)),
		$usedIdsSvocal,
		({ id }) => id
	);
	let inactiveItems = allItems.filter(({ id }) => !$usedIdsSvocal.includes(id));

	const saveToSvocal = () => {
		const ids = items.map(({ id }) => id);
		usedIdsSvocal.set(ids);
	};

	$: {
		// Todo: Fix that svocal bug
		if (browser) saveToSvocal();

		items;
	}
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
				on:remove={() => {
					const removed = items.splice(index, 1);
					if (!removed) return;

					items = items;
					inactiveItems = [...inactiveItems, removed[0]];
				}}
				canBeRemoved={!!(items.length - 1)}
			/>
		{/each}
	</ul>
	{#if inactiveItems.length}
		<div>
			<h5>Nicht genutzte möglichkeiten</h5>
			<ul class="flex gap-2 flex-col">
				{#each inactiveItems as item, index}
					<li class="flex gap-2 items-center">
						<i class="bx {item.boxIcon}" />
						<button
							class="px-2 py-1 rounded-sm bg-light-secondary dark:bg-dark-secondary shadow-sm"
							on:click={() => {
								const removed = inactiveItems.splice(index, 1);
								if (!removed) return;

								inactiveItems = inactiveItems;
								items = [...items, ...removed];
							}}
						>
							Add
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
