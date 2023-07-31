<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';

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
		<div class="inputBox">
			<input type="text" name="username" bind:value={usernameValue} placeholder=" " />
			<label for="username">Username</label>
		</div>
		<div class="inputBox">
			<input type="password" bind:value={passwordValue} placeholder=" " />
			<label for="username">Password</label>
		</div>
		<input type="submit" value="Login" {disabled} />
	</form>

	<p id="successMessage">{successText}</p>
	<p id="errorMessage">{errorText}</p>
</div>

<style>
	/* OVERALL LAYOUT */

	:root {
		--bg: hsla(0, 0%, 5%, 0.4);
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

	/* BASIC INPUT BOX */

	.inputBox {
		position: relative;
		isolation: isolate;
		border-radius: 0.5rem;
		border: solid 2px var(--accent);
	}

	label {
		position: absolute;
		text-align: start;

		display: inline-block;

		left: 0.5rem; /* The padding of the inputbox */
		top: 0.5rem;

		z-index: -1;

		color: var(--text);
		opacity: 0.5;
	}

	input {
		background-color: transparent;
		border: none;
		padding: 0.5rem;
		color: var(--text);

		border-radius: inherit;
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
