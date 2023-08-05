<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import LoginInput from '$lib/LoginInput.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { loadClasses } from '$lib/register/loadClasses';
	import { loadSchools } from '$lib/register/loadSchools';
	import { i } from '@inlang/sdk-js';

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

<div id="wrapper">
	<h3>{i('registerNow')}</h3>

	<form
		on:submit={async () => {
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

			// TODO: it isn't usefull when the school just got created because a class can't be created

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
					console.log(obj);
					if (obj.status === 'error') {
						// create error messages for the user when there is an error
						const errorTextesObj = {
							[`User ${username} already exists`]: i('regisiter.usernameTakenError'),
							[`School ${school} does not exist`]: i('regisiter.schoolExistensError'),
							[`Class ${className} does not exist`]: i('regisiter.classExistensError'),
							'Internal server error': i('regisiter.userCouldNotbeCreatedError')
						};

						errorText = errorTextesObj[obj.error] || i('error');
						successText = '';
					} else if (obj.status === 'success') {
						successText = i('regisiter.userCreated');
						errorText = '';
					} else {
						errorText = i('error');
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
		{#await loadSchools(school) then data}
			<datalist id="schoolsList">
				{#each data.schools as schoolObj}
					<option value={schoolObj.uniqueName} />
				{/each}
			</datalist>
		{/await}

		<LoginInput
			type="text"
			name={i('class')}
			tooltip={i('register.class.tooltip')}
			bind:value={className}
			list="classList"
			autocomplete="off"
		/>
		{#await loadClasses(school) then data}
			{#if data}
				<datalist id="classList">
					{#each data as classObj}
						<option value={classObj.name} />
					{/each}
				</datalist>
			{/if}
		{/await}

		<LoginInput
			type="password"
			newPassword={true}
			name={i('password')}
			tooltip={i('register.password.tooltip')}
			bind:value={password}
		/>

		<SubmitButton value={i('register')} {disabled} />
	</form>

	<span id="small">
		<a href="/login">{i('register.login')}</a>
	</span>

	<p id="successMessage">{successText}</p>
	<p id="errorMessage">{errorText}</p>
</div>

<style>
	/* OVERALL LAYOUT*/
	#wrapper {
		display: flex;
		flex-direction: column;

		padding: 1rem;

		box-sizing: border-box;

		border-radius: 1rem;

		text-align: center;

		width: 100%;
		background-color: var(--bg);
	}

	form {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem;

		margin-bottom: 1rem;
	}

	/* SUCCESS AND ERROR MESSAGES */

	:is(#successMessage, #errorMessage):empty {
		display: none;
	}

	#successMessage {
		color: var(--success);
	}
	#errorMessage {
		color: var(--error);
	}

	/* SMALL TEXT AND LINK */

	#small,
	#small * {
		font-size: 0.75rem;
	}

	/* DESKTOP LAYOUT */

	@media only screen and (min-width: 768px) {
		/* Large Screens */
		#wrapper {
			width: clamp(19rem, 50%, 25rem);
		}
	}
</style>
