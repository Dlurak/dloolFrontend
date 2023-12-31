<script lang="ts">
	import { page } from '$app/stores';
	import CentralFormBox from '$lib/CentralFormBox.svelte';
	import LoginInput from '$lib/auth/Input.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { i, type Token } from '../../languages/i18n';
	import I18n from '$lib/I18n.svelte';
	import Loader from '$lib/Loader.svelte';
	import { network, title } from '../../stores';
	import { backendUrl } from '$lib/../stores';

	let usernameValue: string;
	let passwordValue: string;

	let errorText: Token | undefined = undefined;
	let successText: Token | undefined = undefined;

	let redirectUri = $page.url.searchParams.get('redirect');

	let disabled = false;
	let loading = false;

	title.set('login');

	const setError = (text: Token) => {
		errorText = text;
		successText = undefined;
		disabled = false;
		loading = false;
	};

	$: {
		disabled = !(!!usernameValue && !!passwordValue) || $network === 'offline';
	}
</script>

<CentralFormBox
	{errorText}
	{successText}
	linkName="login.register"
	linkHref="/register"
	title="login.welcome"
	onSubmit={async () => {
		disabled = true;
		loading = true;
		fetch($backendUrl + '/auth/login', {
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
						setError('error');
						break;
					case 401:
						setError('login.error.wrongCred');
						break;
					case 200:
						errorText = undefined;
						successText = 'login.success';
						break;
					default:
						setError('login.error.weird');
						break;
				}
				return res.json();
			})
			.then((obj) => {
				if (!obj.token) return;

				localStorage.setItem('token', obj.token);
				localStorage.setItem('tokenExpires', `${new Date().getTime() + 60 * 60 * 1000}`);

				return fetch(`${$backendUrl}/auth/me`, {
					headers: {
						Authorization: `Bearer ${obj.token}`
					}
				});
			})
			.then((res) => {
				if (!res) return;
				return res.json();
			})
			.then((data) => {
				loading = false;
				if (!data) return;
				localStorage.setItem('user', JSON.stringify(data));
				localStorage.setItem('userId', data.data.id);
				localStorage.setItem('userExpires', `${new Date().getTime() + 60 * 60 * 1000}`);
				if (redirectUri) window.location.href = redirectUri;
			})
			.catch(() => {
				setError('error');
			});
	}}
>
	<I18n>
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
	</I18n>
	<SubmitButton {disabled}>
		{#if loading}
			<Loader />
		{:else}
			<I18n key="login" />
		{/if}
	</SubmitButton>
</CentralFormBox>
