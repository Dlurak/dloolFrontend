import { get } from 'svelte/store';
import { backendUrl, timetable } from '../../stores';
import type { CustomDate } from '../../types/customDate';
import type { Assignment } from '../../types/homework';
import { addToast } from '$lib/toast/addToast';
import { Status } from '../../enums/status';
import { getWeekdayAbbreviationByDate } from '$lib/dates/dataWeekday';
import { sortByDifferentArray } from '$lib/utils/arrays/sort';
import { localstorage } from 'svocal';
import { SvocalKeys } from '../../enums/svocal';

interface CrateHomeworkData {
	assignements: Assignment[];
	assignedAt: CustomDate;
	className: string;
}

export async function createHomework({ assignements, assignedAt, className }: CrateHomeworkData) {
	const weekday = getWeekdayAbbreviationByDate(assignedAt);
	const subjects = get(timetable)[weekday];

	const mappedAssignments = assignements.map((a) => ({
		subject: a.subject.trim(),
		description: a.description.trim(),
		due: a.due
	}));

	const bodyObj = {
		from: assignedAt,
		assignments: localstorage(SvocalKeys.TIMETABLE_AUT_SORT, true)
			? sortByDifferentArray(mappedAssignments, subjects, (a) => a.subject)
			: mappedAssignments,
		className
	};

	return fetch(get(backendUrl) + '/homework', {
		method: 'POST',
		headers: new Headers({
			authorization: `Bearer ${localStorage.getItem('token')}`,
			'content-type': 'application/json'
		}),
		body: JSON.stringify(bodyObj)
	})
		.then((res) => {
			if (res.ok) {
				addToast({
					content: 'toast.homework.add.success',
					type: 'success',
					duration: 5000
				});

				return Status.SUCCESS;
			} else throw new Error();
		})
		.catch(() => {
			addToast({
				content: 'toast.homework.add.error',
				type: 'error',
				duration: 5000
			});

			return Status.FAIL;
		});
}
