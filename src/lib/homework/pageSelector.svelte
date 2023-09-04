<script lang="ts">
	import { i } from '@inlang/sdk-js';
	import Box from './Box.svelte';

	export let currentPage: number;
	export let totalPageCount: number;
	export let setPageFunction: (page: number) => void;

	type direction = 'left' | 'right' | 'first' | 'last';

	interface IButton {
		direction: direction;
		title: string;
		onClick: () => void;
		disabled: boolean;
	}

	let isMin = currentPage === 1;
	let isMax = currentPage === totalPageCount;

	const setPage = (page: number) => {
		setPageFunction(page);
		isMin = page === 1;
		isMax = page === totalPageCount;
	};

	const buttonFactory = () => {
		return [
			{
				direction: 'left',
				title: 'previous',
				onClick: () => {
					setPage(currentPage - 1);
				},
				disabled: isMin
			},
			{
				direction: 'right',
				title: 'next',
				onClick: () => {
					setPage(currentPage + 1);
				},
				disabled: isMax
			},
			{
				direction: 'first',
				title: 'first',
				onClick: () => {
					setPage(1);
				},
				disabled: isMin
			},
			{
				direction: 'last',
				title: 'last',
				onClick: () => {
					setPage(totalPageCount);
				},
				disabled: isMax
			}
		] as IButton[];
	};

	const mapDirectionToBoxIcon = (direction: direction) => {
		switch (direction) {
			case 'left':
				return 'bx-chevron-left';
			case 'right':
				return 'bx-chevron-right';
			case 'first':
				return 'bx-chevrons-left';
			case 'last':
				return 'bx-chevrons-right';
		}
	};

	const mapButtons = (buttons: IButton[]) => {
		return buttons.map((button) => {
			return {
				...button,
				title: i(`homework.page.${button.title}`),
				direction: mapDirectionToBoxIcon(button.direction)
			};
		});
	};

	let buttons = buttonFactory();
	let mappedButtons = mapButtons(buttons);

	$: {
		isMin && isMax;

		buttons = buttonFactory();
		mappedButtons = mapButtons(buttons);
	}
</script>

<Box>
	<input
		class="w-full cursor-pointer appearance-none bg-light-accent dark:bg-dark-accent h-1 rounded-md my-4"
		type="range"
		min="1"
		max={totalPageCount}
		bind:value={currentPage}
		on:change={() => {
			setPage(currentPage);
		}}
	/>
	<div class="grid grid-cols-2 gap-2">
		{#each mappedButtons as buttonObj}
			<button
				class="flex items-center justify-center w-full h-full bg-form-box-background rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
				title={i(`homework.page.${buttonObj.title}`)}
				on:click={buttonObj.onClick}
				disabled={buttonObj.disabled}
			>
				<i class="bx {buttonObj.direction} text-2xl" />
			</button>
		{/each}
	</div>
</Box>
