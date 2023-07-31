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
					console.log('Am I here?');
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
		<LoginInput type="text" bind:value={usernameValue} />
		<LoginInput type="password" bind:value={passwordValue} />
		<input type="submit" value="Login" {disabled} />
	</form>

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
	}

	/* SUCCESS AND ERROR MESSAGES */

	:is(#successMessage, #errorMessage):empty {
		display: none;
	}

	#successMessage {
		color: lightgreen;
	}
	#errorMessage {
		color: lightcoral;
	}
</style>
