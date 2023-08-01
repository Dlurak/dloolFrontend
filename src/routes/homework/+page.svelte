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

			<ul class="assignmentList">
				{#each homework.assignments as assignment}
                    <li>
                        <span class="assignments-firstrow">
                            <h4>{assignment.subject}</h4>
                            <p>
                                {getWeekdayByDate(assignment.due)}
                                {assignment.due.day}.{assignment.due.month}.{assignment.due.year}
                            </p>
                        </span>
                        <p class="description">{assignment.description}</p>
                    </li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
    #wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        width: 100%;
        gap: 2rem;
    }

    .box {
        padding: 1rem;
        border-radius: 1rem;
		background-color: var(--bg);
    }

    .assignmentList {
        list-style-type: none;
        padding: 0;
    }

    .assignments-firstrow {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: 0.5rem;
    }

    .assignments-firstrow * {
        margin-block: 0.6rem;
    }

    .description {
        margin-block: 0.5rem;
    }
</style>