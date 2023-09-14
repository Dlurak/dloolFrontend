export function isUserMember(classname: string, school: string) {
	if (Number(localStorage.getItem('tokenExpires')) < new Date().getTime()) {
		return false;
	}

	const userRawData = JSON.parse(localStorage.getItem('user') || '{}');
	const userData = userRawData.data;
	if (!userData) return false;

	const userSchool = userData.school.uniqueName;
	const userClasses: string[] = userData.classes.map((i: { name: string }) => i.name);

	const userIsInSchool = school === userSchool;
	const userIsInClass = userClasses.includes(classname);

	return userIsInClass && userIsInSchool;
}
