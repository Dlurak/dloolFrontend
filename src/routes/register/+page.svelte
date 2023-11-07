<script lang="ts">
	import CentralFormBox from '$lib/CentralFormBox.svelte';
	import LoginInput from '$lib/auth/Input.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import { loadSchools } from '$lib/auth/loadSchools';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';
	import { i, type Token } from '../../languages/i18n';
	import I18n from '$lib/I18n.svelte';
	import { title } from '../../stores';
	import Modal from '$lib/Modal.svelte';
	import { onMount } from 'svelte';
	import { backendUrl } from '$lib/../stores';

	let username: string;
	let name: string;
	let school: string;
	let className: string;
	let password: string;

	title.set('register');

	/**
	 * A boolean indicating whether the submit button should be disabled
	 */
	let disabled = false;

	let errorText: Token | undefined = undefined;
	let successText: Token | undefined = undefined;

	let showModal = false;

	const setErrorText = (text: Token) => {
		errorText = text;
		successText = undefined;
		disabled = false;
	};

	$: {
		disabled = !(!!username && !!name && !!school && !!className && !!password); // all fields need to be filled
	}

	onMount(() => (showModal = true));
</script>

<CentralFormBox
	{errorText}
	{successText}
	title="registerNow"
	linkName="register.login"
	linkHref="/login"
	onSubmit={async () => {
		disabled = true;
		// check if the school exists
		const schoolDetails = await fetch(`${$backendUrl}/schools/${school}`).then((res) => res.json());

		if (!schoolDetails.data) {
			// create the school
			await fetch(`${$backendUrl}/schools`, {
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
					setErrorText('error');
				}
			});
		}

		// Now the school exists either newly created or old

		const classDetails = await fetch(
			`${$backendUrl}/classes/${school}/${className.toLowerCase()}`
		).then((res) => res.json());

		if (!classDetails.data) {
			// create the class
			await fetch(`${$backendUrl}/classes`, {
				method: 'POST',
				headers: new Headers({ 'content-type': 'application/json' }),
				body: JSON.stringify({
					name: className,
					school: school
				})
			}).then((res) => {
				if (!res.ok) {
					setErrorText('error');
				}
			});
		}

		fetch($backendUrl + '/auth/register', {
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
							setErrorText('register.usernameTakenError');
							break;
						default:
							setErrorText('error');
							break;
					}
					successText = undefined;
				} else if (obj.message === 'User created') {
					successText = 'register.userCreated';
					errorText = undefined;

					// log the user in
					return fetch($backendUrl + '/auth/login', {
						method: 'POST',
						headers: new Headers({ 'content-type': 'application/json' }),
						body: JSON.stringify({
							username,
							password
						})
					});
				} else if (obj.message === 'Successfully created request') {
					successText = 'register.requestCreated';
					errorText = undefined;
					localStorage.setItem('registerRequest', obj.data.id);
				} else {
					setErrorText('error');
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

					successText = 'login.success';
				}
			});
	}}
>
	<I18n>
		<LoginInput
			type="text"
			name={i('username')}
			tooltip={i('register.username.tooltip')}
			bind:value={username}
		/>
		<LoginInput
			type="text"
			name={i('name')}
			tooltip={i('register.name.tooltip')}
			bind:value={name}
		/>
		<LoginInput
			type="text"
			name={i('school')}
			tooltip={i('register.school.tooltip')}
			bind:value={school}
			list="schoolsList"
			autocomplete="off"
		/>

		<LoginInput
			type="text"
			name={i('class')}
			tooltip={i('register.class.tooltip')}
			bind:value={className}
			list="classList"
			autocomplete="off"
		/>

		<LoginInput
			type="password"
			newPassword={true}
			name={i('password')}
			tooltip={i('register.password.tooltip')}
			bind:value={password}
		/>

		<SubmitButton value={i('register')} {disabled} />
	</I18n>
	<SelectDataList id="schoolsList" loadFunction={loadSchools} searchParam={school} />
	<SelectDataList id="classList" loadFunction={loadClasses} searchParam={school} />
</CentralFormBox>

<I18n>
	<Modal bind:open={showModal} title={i('register.modal')}>
		<div class="grid grid-cols-2">
			<div>
				<h3>{i('register.modal.positive')}</h3>
				<ul class="list-disc">
					{#each i('register.modal.positive.list').split('\n') as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
			<div>
				<h3>{i('register.modal.negative')}</h3>
				<ul class="list-disc">
					{#each i('register.modal.negative.list').split('\n') as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		</div>
	</Modal>
</I18n>
