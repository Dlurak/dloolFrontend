<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import LoginInput from '$lib/LoginInput.svelte';

	let usernameValue: string;
	let passwordValue: string;

	let errorText = '';
	let successText = '';

	let disabled = false;

	$: {
		disabled = !(!!usernameValue && !!passwordValue);
	}
</script>

<svelte:head>
	<title>Dlool | Login</title>
</svelte:head>

<div id="wrapper">
	<h3>Welcome Back</h3>

	<form
		on:submit={() => {
			fetch(PUBLIC_API_URL + '/auth/login', {
				method: 'POST',
				headers: new Headers({ 'content-type': 'application/json' }),
				body: JSON.stringify({
					username: usernameValue,
					password: passwordValue
				})
			})
				.then((res) => {
					switch (res.status) {
						case 400:
							errorText = 'Something went wrong';
							successText = '';
							break;
						case 401:
							errorText = 'Wrong password or username';
							successText = '';
							break;
						case 200:
							errorText = '';
							successText = 'You are now logged in';
							break;
						default:
							errorText = `This is weird, when you see this text please submit a GitHub issue. Please say that this was the status code: ${res.status}`;
							successText = '';
							break;
					}
					return res.json();
				})
				.then((obj) => {
					if (!obj.token) return;

					localStorage.setItem('token', obj.token);
				})
				.catch((err) => {
					errorText = 'Oh no, something went wrong';
					successText = '';
				});
		}}
	>
		<LoginInput type="text" bind:value={usernameValue} tooltip="This is your unique username" />
		<LoginInput
			type="password"
			bind:value={passwordValue}
			tooltip="This is your password, if you forgot it, your account is lost for ever; there is now way to restore it!"
		/>
		<input type="submit" value="Login" {disabled} />
	</form>

	<span id="small">
		No acount? No problem! You can register <a href="/register">here</a>
	</span>

	<p id="successMessage">{successText}</p>
	<p id="errorMessage">{errorText}</p>
</div>

<style>
	/* OVERALL LAYOUT */

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

	#wrapper * {
		box-sizing: border-box;
		width: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		margin-bottom: 1rem;
	}

	/* SUBMIT BUTTON */

	input[type='submit'] {
		border: none;
		border-radius: 0.4rem;
		background-color: green;
		color: white;
		padding: 0.25rem;
		cursor: pointer;

		margin-top: 1rem;

		box-shadow: 0 0 2rem black;

		transition: all var(--transition-timing-function) var(--transition-timing);
	}

	input[type='submit']:not(:disabled):is(:hover, :focus) {
		translate: 0 -0.25rem;
		box-shadow: 0 15px 2rem black;

		outline: none;
	}

	input[type='submit']:active {
		transform: scale(0.95);
		box-shadow: 0 0 2.5rem black;
	}

	input[type='submit']:disabled {
		opacity: 0.7;
		box-shadow: none;
		cursor: not-allowed;
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
