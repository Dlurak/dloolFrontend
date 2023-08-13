<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import CentralFormBox from '$lib/CentralFormBox.svelte';
	import LoginInput from '$lib/LoginInput.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { i } from '@inlang/sdk-js';

	let usernameValue: string;
	let passwordValue: string;

	let errorText = '';
	let successText = '';

	let redirectUri = $page.url.searchParams.get('redirect');

	let disabled = false;

	$: {
		disabled = !(!!usernameValue && !!passwordValue);
	}
</script>

<svelte:head>
	<title>Dlool | {i('login')}</title>
</svelte:head>

<CentralFormBox
	{errorText}
	{successText}
	linkName={i('login.register')}
	linkHref="/register"
	title={i('login.welcome')}
	onSubmit={() => {
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
				localStorage.setItem('tokenExpires', `${new Date().getTime() + 60 * 60 * 1000}`);

				if (redirectUri) window.location.href = redirectUri;
			})
			.catch(() => {
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
</CentralFormBox>
