<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import CentralFormBox from '$lib/CentralFormBox.svelte';
	import LoginInput from '$lib/auth/Input.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import { loadSchools } from '$lib/auth/loadSchools';
	import { i } from '@inlang/sdk-js';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';

	let username: string;
	let name: string;
	let school: string;
	let className: string;
	let password: string;

	let disabled = false;

	let errorText = '';
	let successText = '';

	$: {
		disabled = !(!!username && !!name && !!school && !!className && !!password); // all fields need to be filled
	}
</script>

<svelte:head>
	<title>Dlool | {i('register')}</title>
</svelte:head>

<CentralFormBox
	{errorText}
	{successText}
	title={i('registerNow')}
	linkName={i('register.login')}
	linkHref="/login"
	onSubmit={async () => {
		// check if the school exists
		const schoolDetails = await fetch(`${PUBLIC_API_URL}/schools/${school}`).then((res) =>
			res.json()
		);

		if (!schoolDetails.data) {
			// create the school
			await fetch(`${PUBLIC_API_URL}/schools`, {
				method: 'POST',
				headers: new Headers({ 'content-type': 'application/json' }),
				body: JSON.stringify({
					name: school,
					uniqueName: school,
					description: school,
					timezoneOffset: 0
				})
			}).then((res) => {
				if (!res.ok) {
					errorText = i('error');
					successText = '';
				}
			});
		}

		// Now the school exists either newly created or old

		const classDetails = await fetch(
			`${PUBLIC_API_URL}/classes/${school}/${className.toLowerCase()}`
		).then((res) => res.json());

		if (!classDetails.data) {
			// create the class
			await fetch(`${PUBLIC_API_URL}/classes`, {
				method: 'POST',
				headers: new Headers({ 'content-type': 'application/json' }),
				body: JSON.stringify({
					name: className,
					school: school
				})
			}).then((res) => {
				if (!res.ok) {
					errorText = i('error');
					successText = '';
				}
			});
		}

		fetch(PUBLIC_API_URL + '/auth/register', {
			method: 'POST',
			headers: new Headers({ 'content-type': 'application/json' }),
			body: JSON.stringify({
				username,
				name,
				school,
				password,
				class: className
			})
		})
			.then((res) => res.json())
			.then((obj) => {
				if (obj.status === 'error') {
					switch (obj.error) {
						case `User ${username} already exists`:
							console.log('Well?');
							errorText = i('register.usernameTakenError');
							break;
						default:
							errorText = i('error');
							break;
					}
					successText = '';
				} else if (obj.message === 'User created') {
					successText = i('register.userCreated');
					errorText = '';

					// log the user in
					return fetch(PUBLIC_API_URL + '/auth/login', {
						method: 'POST',
						headers: new Headers({ 'content-type': 'application/json' }),
						body: JSON.stringify({
							username,
							password
						})
					});
				} else if (obj.message === 'Successfully created request') {
					successText = i('register.requestCreated');
					errorText = '';
					localStorage.setItem('registerRequest', obj.data.id);
				} else {
					errorText = i('error');
				}

				if (obj.status === 'success') {
					// clear all fields so it is clear that it worked and the user doesn't try to register twice
					username = name = school = className = password = '';
				}
			})
			.then((data) => {
				if (data) {
					return data.json();
				}
			})
			.then((obj) => {
				if (obj) {
					const { token } = obj;
					if (!token) return;

					localStorage.setItem('token', token);
					localStorage.setItem('tokenExpires', `${new Date().getTime() + 60 * 60 * 1000}`);

					successText = i('login.success');
				}
			});
	}}
>
	<LoginInput
		type="text"
		name={i('username')}
		tooltip={i('register.username.tooltip')}
		bind:value={username}
	/>
	<LoginInput type="text" name={i('name')} tooltip={i('register.name.tooltip')} bind:value={name} />
	<LoginInput
		type="text"
		name={i('school')}
		tooltip={i('register.school.tooltip')}
		bind:value={school}
		list="schoolsList"
		autocomplete="off"
	/>
	<SelectDataList id="schoolsList" loadFunction={loadSchools} searchParam={school} />

	<LoginInput
		type="text"
		name={i('class')}
		tooltip={i('register.class.tooltip')}
		bind:value={className}
		list="classList"
		autocomplete="off"
	/>
	<SelectDataList id="classList" loadFunction={loadClasses} searchParam={school} />

	<LoginInput
		type="password"
		newPassword={true}
		name={i('password')}
		tooltip={i('register.password.tooltip')}
		bind:value={password}
	/>

	<SubmitButton value={i('register')} {disabled} />
</CentralFormBox>
