<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import LoginInput from '$lib/LoginInput.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';

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
	<title>Dlool | Register</title>
</svelte:head>

<div id="wrapper">
	<h3>Register now</h3>

	<form
		on:submit={() => {
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
						// create error messages for the user when there is an error
						const errorTextesObj = {
							[`User ${username} already exists`]: 'The username is already taken',
							[`School ${school} does not exist`]: "This school doesn't exist",
							[`Class ${className} does not exist`]: "This class doesn't exist",
							'Internal server error': 'User could not be created'
						};

						errorText = errorTextesObj[obj.error] || 'Something went wrong';
						successText = '';
					} else if (obj.status === 'success') {
						successText = 'You are now a user!';
						errorText = '';
					} else {
						errorText = 'This is very unexpected';
						successText =
							"Indeed this is so unexpected that I don't even now if a account was created or not";
					}
				});
		}}
	>
		<LoginInput
			type="text"
			name="username"
			tooltip="This is your username, it must be unique"
			bind:value={username}
		/>
		<LoginInput
			type="text"
			name="name"
			tooltip="This is your name, it doesn't need to be unique"
			bind:value={name}
		/>
		<LoginInput
			type="text"
			name="school"
			tooltip="This is your school. Insert the uniquename of your school, currently you can't figuere out what this is but soon"
			bind:value={school}
		/>
		<LoginInput
			type="text"
			name="class"
			tooltip="This is your class. Insert the name of your class."
			bind:value={className}
		/>
		<LoginInput
			type="password"
			newPassword={true}
			tooltip="This is your password, currently I don't require a secure password but you should choose a secure one"
			bind:value={password}
		/>

		<SubmitButton value="Register" {disabled} />
	</form>

	<span id="small">
		When you already have an account you can login <a href="/login">here</a>
	</span>

	<p id="successMessage">{successText}</p>
	<p id="errorMessage">{errorText}</p>
</div>

<style>
	/* OVERALL LAYOUT*/

	:root {
		--bg: hsla(0, 0%, 5%, 0.2);
	}

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
