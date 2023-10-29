<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let link: {
		id: number;
		title: string;
		description: string;
		path: string;
		bxIcon: string;
	};
	export let isFocused: boolean;
</script>

<a
	href={link.path}
	class="flex items-center gap-2 px-3 py-1 text-light-text dark:text-dark-text focus:outline-none focus:border-none"
	class:bg-gray-400={isFocused}
	class:dark:bg-gray-500={isFocused}
	class:shadow-sm={isFocused}
	on:click={() => dispatch('close')}
	on:mouseenter={() => dispatch('focus', link.id)}
	on:focus={() => dispatch('focus', link.id)}
>
	<i class="bx {link.bxIcon}  flex text-xl" />
	<div>
		<h4 class="line-clamp-1">{link.title}</h4>
		<p
			class="line-clamp-1 text-sm"
			class:text-gray-600={!isFocused}
			class:dark:text-gray-400={!isFocused}
		>
			{link.description}
		</p>
	</div>
</a>
