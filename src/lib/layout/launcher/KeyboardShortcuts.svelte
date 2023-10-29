<script lang="ts">
	import { tick } from 'svelte';
	import { isElementVisible } from './elementIsVisible';
	import { goto } from '$app/navigation';

	export let show: boolean;
	export let focusedId: number;
	export let linkIds: number[];
	export let close: VoidFunction;
	export let inputElement: HTMLInputElement;
	export let entriesObj: Record<number, HTMLLIElement>;
	export let linkListDiv: HTMLDivElement;
	export let linkList: {
		id: number;
		title: string;
		description: string;
		path: string;
		bxIcon: string;
	}[];
</script>

<svelte:window
	on:keydown={async (e) => {
		if (e.key === 'Escape') {
			close();
			return;
		} else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
			e.preventDefault();
			if (show) {
				close();
			} else {
				show = true;
				await tick();
				inputElement.focus();
			}
			return;
		}

		if (show) {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				const index = linkIds.indexOf(focusedId);

				if (e.key === 'ArrowDown') {
					focusedId = index === linkIds.length - 1 ? linkIds[0] : linkIds[index + 1];
				} else {
					focusedId = index === 0 ? linkIds[linkIds.length - 1] : linkIds[index - 1];
				}

				const element = entriesObj[focusedId];
				if (!element) return;

				if (!isElementVisible(element, linkListDiv))
					element.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest',
						inline: 'start'
					});
				return;
			} else if (e.key === 'Enter') {
				e.preventDefault();
				const link = linkList.find((link) => link.id === focusedId);

				if (link) {
					goto(link.path).then(() => close());
					return;
				}
			}
		}
	}}
/>
