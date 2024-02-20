<script lang="ts">
	import { currentLanguage, timetable } from '../../../stores';
	import { emptyTimeTable, type WeekDay } from '../../../constants/weekDays';
	import { getWeekdayByAbbreviation } from '$lib/dates/dataWeekday';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import I18n from '$lib/I18n.svelte';
	import { subjectsSortetCapitalized } from '../../../constants/subjecticons';
	import UseTimeTableForAutcompletion from '$lib/preferences/UseTimeTableForAutocompletion.svelte';
	import { getFile } from '$lib/files/readFile';
	import { addToast } from '$lib/toast/addToast';
	import { timetableSchema } from '../../../zod/timetable';
	import { i } from '../../../languages/i18n';
	import UseForAutoSort from '$lib/preferences/timetable/UseForAutoSort.svelte';

	const getWeekdays = () =>
		(Object.keys($timetable) as WeekDay[]).map((abbr) => ({
			abbr,
			long: getWeekdayByAbbreviation(abbr)
		}));

	const getMaximumLessons = () =>
		Math.max(...Object.values($timetable).map((lessons) => lessons.length));

	const filterOutEmptyLessons = (lessons: string[]) => lessons.filter((l) => !l || l.trim() !== '');
	const getLessonsPerIndex = (index: number) => {
		const allLessons = Object.values($timetable);
		const nonEmptyLessons = allLessons.map((l) => filterOutEmptyLessons(l));

		return nonEmptyLessons.map((lessons) => lessons[index] ?? '');
	};

	let weekdays = getWeekdays();
	let maxLessons = getMaximumLessons();

	/**
	 * Updates all the variables, call this function when the timetable or the language changes
	 */
	const updater = () => {
		weekdays = getWeekdays();
		maxLessons = getMaximumLessons();
	};

	currentLanguage.subscribe(updater);
	timetable.subscribe(updater);

	const appendLessonToDay = (day: WeekDay, lesson: string) => {
		$timetable[day].push(lesson);
		updater();

		$timetable = $timetable;
	};

	const sanitizeWeekday = (day: WeekDay) => {
		const lessons = $timetable[day];
		const nonEmptyLessons = filterOutEmptyLessons(lessons);

		timetable.update((t) => ({ ...t, [day]: nonEmptyLessons }));
	};

	const sanitizeTimetable = () => {
		for (const day of Object.keys($timetable) as WeekDay[]) {
			sanitizeWeekday(day);
		}
	};

	let newLessons = new Array(getWeekdays().length).fill(null).map((_, i) => ({
		value: '',
		blur: () => {
			const value = newLessons[i].value.trim();
			if (value === '') return;

			appendLessonToDay(weekdays[i].abbr, newLessons[i].value);
			newLessons[i].value = '';
			// timetable.set($timetable);
		}
	}));
</script>

<div class="flex justify-end pb-2 gap-3">
	<button
		class="px-3 py-1 rounded-md bg-red-500 text-white"
		on:click={() => {
			timetable.set(emptyTimeTable);
		}}
	>
		<i class="bx bx-trash" />
		<I18n key="settings.timetable.reset" />
	</button>
	<button
		class="px-3 py-1 rounded-md text-white bg-green-500"
		on:click={() => {
			const data = JSON.stringify($timetable);
			const blob = new Blob([data], { type: 'application/json' });
			const url = URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = 'timetable.json';
			a.click();
		}}
	>
		<i class="bx bx-download" />
		<I18n key="settings.timetable.export" />
	</button>
	<button
		class="px-3 py-1 rounded-md text-white bg-blue-500"
		on:click={async () => {
			if (maxLessons > 0 && !confirm(i('settings.timetable.import.confirm'))) return;

			const raw = await getFile('.json');
			if (!raw) {
				addToast({
					type: 'error',
					content: 'toast.file.ReadError',
					duration: 5000
				});
				return;
			}

			try {
				const data = JSON.parse(raw.content);
				const parsed = timetableSchema.parse(data);
				// @ts-expect-error zod scheme is partitial which is ok
				timetable.set(parsed);
			} catch (e) {
				addToast({
					type: 'error',
					content: 'toast.file.InvalidFile',
					duration: 5000
				});
				return;
			}
		}}
	>
		<i class="bx bx-upload" />
		<I18n key="settings.timetable.import" />
	</button>
</div>

<div class="outline-sky-500 max-w-full overflow-x-scroll">
	<table class="w-full text-center rounded-sm">
		<thead>
			<tr>
				{#each weekdays as day}
					<th>
						{day.long}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each { length: maxLessons } as _, i}
				<tr>
					{#key $timetable}
						{#each getLessonsPerIndex(i) as lesson, j}
							<td>
								<div class="flex gap-1">
									<input
										type="text"
										value={lesson}
										on:blur={(e) => {
											$timetable[weekdays[j].abbr][i] = e.currentTarget.value;
											$timetable = $timetable;
											sanitizeTimetable();
										}}
										class="rounded-sm text-light-text dark:text-light-text px-2 py-0.5 bg-gray-200"
										list="subjects"
									/>
									<datalist id="subjects">
										{#each subjectsSortetCapitalized as subj}
											<option value={subj} />
										{/each}
									</datalist>
									{#if lesson.trim()}
										<QuickActionButton
											iconName="bx bx-trash"
											color="text-red-500"
											on:click={() => {
												const lessons = $timetable[weekdays[j].abbr];
												const splicedLessons = lessons.toSpliced(i, 1);

												timetable.update((t) => ({ ...t, [weekdays[j].abbr]: splicedLessons }));
											}}
										/>
									{/if}
								</div>
							</td>
						{/each}
					{/key}
				</tr>
			{/each}
			<tr>
				{#each newLessons as newLesson}
					<td>
						<input
							type="text"
							bind:value={newLesson.value}
							on:blur={newLesson.blur}
							class="rounded-sm text-light-text dark:text-light-text px-2 py-0.5 bg-gray-200 w-full"
						/>
					</td>
				{/each}
			</tr>
		</tbody>
	</table>
</div>

<hr class="my-3" />

<div class="flex flex-col gap-2">
	<UseTimeTableForAutcompletion />
	<UseForAutoSort />
</div>
