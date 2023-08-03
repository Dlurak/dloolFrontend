import { PUBLIC_API_URL } from '$env/static/public';

export async function isUserMember(classname: string, school: string) {
	if (Number(localStorage.getItem('tokenExpires')) < new Date().getTime()) {
		return false;
	}

	const requestResponse = await fetch(PUBLIC_API_URL + '/auth/me', {
		headers: new Headers({
			authorization: `Bearer ${localStorage.getItem('token')}`,
			'content-type': 'application/json'
		})
	}).then((r) => r.json());

	const userData = requestResponse.data;

	const userSchool = userData.school.uniqueName;
	const userClasses: string[] = userData.classes.map((i: any) => i.name);

	const userIsInSchool = school === userSchool;
	const userIsInClass = userClasses.includes(classname);

	return userIsInClass && userIsInSchool;
}
