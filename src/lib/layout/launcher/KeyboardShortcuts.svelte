<script lang="ts">
	import { tick } from 'svelte';
	import { isElementVisible } from './elementIsVisible';
	import { goto } from '$app/navigation';

	export let show: boolean;
	export let focusedId: number;
	export let inputElement: HTMLInputElement;
	export let highesId: number;
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
			show = false;
			return;
		} else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
			e.preventDefault();
			show = !show;
			if (show) {
				await tick();
				inputElement.focus();
			}
			return;
		}

		if (show) {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				focusedId =
					e.key === 'ArrowDown'
						? focusedId === highesId
							? 0
							: focusedId + 1
						: focusedId === 0
						? highesId
						: focusedId - 1;

				const element = entriesObj[focusedId];
				if (!element) return;

				if (!isElementVisible(element, linkListDiv))
					element.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest',
						inline: 'start'
					});
			} else if (e.key === 'Enter') {
				e.preventDefault();
				const link = linkList.find((link) => link.id === focusedId);

				if (link) {
					goto(link.path).then(() => (show = false));
					return;
				}
			}
		}
	}}
/>
