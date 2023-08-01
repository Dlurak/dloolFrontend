<script lang="ts">
	import { getWeekdayByDate } from '$lib/dataWeekday';

	export let data: any;
</script>

<div id="wrapper">
	{#each data.data as homework}
		<div class="box">
			<h3 class="date">
				{getWeekdayByDate(homework.from)}
				{homework.from.day}.{homework.from.month}.{homework.from.year}
			</h3>

			<ul>
				{#each homework.assignments as assignment}
                    <li>
                        <span class="assignments-firstrow">
                            <h4>{assignment.subject}</h4>
                            <p>
                                {getWeekdayByDate(assignment.due)}
                                {assignment.due.day}.{assignment.due.month}.{assignment.due.year}
                            </p>
                        </span>
                        <p>{assignment.description}</p>
                    </li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
