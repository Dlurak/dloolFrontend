<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import LoginInput from '$lib/auth/Input.svelte';
	import CentralFormBox from '$lib/CentralFormBox.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { onMount } from 'svelte';
	import { i, type Token } from '../../languages/i18n';
	import I18n from '$lib/I18n.svelte';
	import { title } from '../stores';

	title.set('settings.settings');

	let successText: Token | undefined = undefined;
	let errorText: Token | undefined = undefined;

	let username = '';
	let name = '';
	let password = '';

	let disabled = true;

	let deleteDisabled = false;

	// make it true once at least one field is filled
	$: disabled = !(username || name || password);

	onMount(() => {
		const tokenExpiresString = localStorage.getItem('tokenExpires');
		const tokenExpires = tokenExpiresString ? Number(tokenExpiresString) : 0;

		const isTokenExpired = new Date().getTime() > tokenExpires;

		if (isTokenExpired) {
			window.location.href = '/login?redirect=/settings';
		}
	});
</script>

<CentralFormBox
	title="settings.settings"
	{errorText}
	{successText}
	onSubmit={(e) => {
		e.preventDefault();

		let body = {};

		if (username) body.username = username;
		if (name) body.name = name;
		if (password) body.password = password;

		fetch(PUBLIC_API_URL + '/auth/me', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			body: JSON.stringify(body)
		}).then((res) => {
			console.log(res);
			if (res.status === 200) {
				successText = 'settings.success';
				localStorage.removeItem('token');
				localStorage.removeItem('tokenExpires');
				deleteDisabled = true;

				setTimeout(() => {
					window.location.href = '/login';
				}, 5 * 1000);
			} else {
				errorText = 'settings.error';
			}
		});
	}}
>
	<I18n>
		<LoginInput
			name={i('settings.username')}
			type="text"
			tooltip={i('settings.username.tooltip')}
			bind:value={username}
		/>
		<LoginInput
			name={i('settings.name')}
			type="text"
			tooltip={i('settings.name.tooltip')}
			bind:value={name}
		/>
		<LoginInput
			name={i('settings.password')}
			type="password"
			newPassword={true}
			tooltip={i('settings.password.tooltip')}
			bind:value={password}
		/>
		<SubmitButton value={i('settings.save')} {disabled} />
		<SubmitButton
			value={i('account.delete')}
			disabled={deleteDisabled}
			colour="red"
			onClick={(e) => {
				e.preventDefault();
				const token = localStorage.getItem('token');

				if (!confirm(i('account.delete.confirm.1'))) return;
				if (!confirm(i('account.delete.confirm.2'))) return;

				const resPromise = fetch(PUBLIC_API_URL + '/auth/me', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token
					}
				});

				resPromise.then(() => {
					window.location.href = '/';
				});
			}}
		/>
	</I18n>
</CentralFormBox>
