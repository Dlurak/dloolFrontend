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
						break
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
	<div>
		<label for="username">Username</label>
		<input type="text" name="username" bind:value={usernameValue} />
	</div>
	<div>
		<label for="username">Password</label>
		<input type="password" bind:value={passwordValue} />
	</div>
	<input type="submit" value="Login" {disabled} />
</form>

<p id="successMessage">{successText}</p>
<p id="errorMessage">{errorText}</p>

<!-- TODO: Style -->
