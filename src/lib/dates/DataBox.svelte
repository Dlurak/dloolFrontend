<script lang="ts">
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import Box from '../homework/Box.svelte';
	import DateLabel from './dateLabel.svelte';

	export let date: CustomDate;
	export let assignments: Assignment[];
</script>

<Box>
	<h3><DateLabel {date} /></h3>

	<ul class="list-none p-0">
		{#each assignments as assignment}
			<li>
				<span class="flex flex-row items-center justify-start gap-2 my-2">
					<h4>{assignment.subject}</h4>

					<DateLabel date={assignment.due} />
				</span>
				<p class="my-2">{assignment.description}</p>
			</li>
		{/each}
	</ul>
</Box>
