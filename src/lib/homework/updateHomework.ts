import { getWeekdayAbbreviationByDate } from '$lib/dates/dataWeekday';
import { get } from 'svelte/store';
import type { Assignment } from '../../types/homework';
import { backendUrl, timetable } from '../../stores';
import type { CustomDate } from '../../types/customDate';
import { addToast } from '$lib/toast/addToast';
import { sortByDifferentArray } from '$lib/utils/arrays/sort';
import { Status } from '../../enums/status';
import { SvocalKeys } from '../../enums/svocal';
import { localstorage } from 'svocal';

interface UpdateHomeworkInterface {
	assignments: Assignment[];
	newDate: CustomDate;
	id: string;
}

export async function updateHomework({ assignments, newDate, id }: UpdateHomeworkInterface) {
	const weekday = getWeekdayAbbreviationByDate(newDate);
	const subjects = get(timetable)[weekday];

	const mappedAssignments = assignments.map((a) => ({
		subject: a.subject.trim(),
		description: a.description.trim(),
		due: a.due
	}));

	const isOk = await fetch(`${get(backendUrl)}/homework/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({
			from: newDate,
			assignments: localstorage(SvocalKeys.TIMETABLE_AUT_SORT, true)
				? sortByDifferentArray(mappedAssignments, subjects, (a) => a.subject)
				: mappedAssignments
		})
	}).then((r) => r.ok);

	if (!isOk) {
		addToast({
			type: 'error',
			content: 'toast.homework.edit.error',
			duration: 5000
		});

		return Status.FAIL;
	}

	addToast({
		type: 'success',
		content: 'toast.homework.edit.success',
		duration: 5000
	});

	return Status.SUCCESS;
}
