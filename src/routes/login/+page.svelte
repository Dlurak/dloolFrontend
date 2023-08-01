<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import LoginInput from '$lib/LoginInput.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { i } from '@inlang/sdk-js';

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
	<title>Dlool | {i('login')}</title>
</svelte:head>

<div id="wrapper">
	<h3>{i('login.welcome')}</h3>

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
							errorText = i('error');
							successText = '';
							break;
						case 401:
							errorText = i('login.error.wrongCred');
							successText = '';
							break;
						case 200:
							errorText = '';
							successText = i('login.success');
							break;
						default:
							errorText = i('login.error.weird');
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
					errorText = i('error');
					successText = '';
				});
		}}
	>
		<LoginInput
			type="text"
			name={i('username')}
			bind:value={usernameValue}
			tooltip={i('login.username.tooltip')}
		/>
		<LoginInput
			type="password"
			name={i('password')}
			bind:value={passwordValue}
			tooltip={i('login.password.tooltip')}
		/>
		<SubmitButton value={i('login')} {disabled} />
	</form>

	<span id="small">
		<a href="/register">{i('login.register')}</a>
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
