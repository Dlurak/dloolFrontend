<script lang="ts">
	import LoginInput from '$lib/auth/Input.svelte';
	import CentralFormBox from '$lib/CentralFormBox.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { onMount } from 'svelte';
	import { i, type Token } from '../../../languages/i18n';
	import I18n from '$lib/I18n.svelte';
	import { network, title } from '../../../stores';
	import { addToast } from '$lib/toast/addToast';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { backendUrl } from '$lib/../stores';

	title.set('settings.settings');

	let successText: Token | undefined = undefined;
	let errorText: Token | undefined = undefined;

	let username = '';
	let name = '';
	let password = '';

	let disabled = true;

	let deleteDisabled = false;

	// make it true once at least one field is filled
	$: disabled = !(username || name || password) || $network === 'offline';
	$: deleteDisabled = $network === 'offline';

	onMount(() => {
		const tokenExpiresString = localStorage.getItem('tokenExpires');
		const tokenExpires = tokenExpiresString ? Number(tokenExpiresString) : 0;

		const isTokenExpired = new Date().getTime() > tokenExpires;

		if (isTokenExpired) {
			const redirectUri = $page.url.pathname + $page.url.search;
			const newUrl = '/login?redirect=' + redirectUri;
			window.location.href = newUrl;
		}
	});

	const handleSubmit = (e: Event) => {
		e.preventDefault();

		let body: Record<string, string> = {};

		if (username) body.username = username;
		if (name) body.name = name;
		if (password) body.password = password;

		fetch($backendUrl + '/auth/me', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			body: JSON.stringify(body)
		}).then((res) => {
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
	};
</script>

<div class="flex justify-center">
	<CentralFormBox title="settings.settings" {errorText} {successText} onSubmit={handleSubmit}>
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

					fetch($backendUrl + '/auth/me', {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + token
						}
					})
						.then((res) => {
							if (res.ok) {
								localStorage.removeItem('token');
								localStorage.removeItem('tokenExpires');

								addToast({
									type: 'success',
									content: 'toast.account.delete.success',
									duration: 5000
								});

								goto('/');
							} else throw new Error();
						})
						.catch(() => {
							addToast({
								type: 'error',
								content: 'toast.account.delete.error'
							});
						});
				}}
			/>
		</I18n>
	</CentralFormBox>
</div>
