<script>
	import { PUBLIC_API_URL } from '$env/static/public';
	import LoginInput from '$lib/LoginInput.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { onMount } from 'svelte';

	let successText = '';
	let errorText = '';

	let username = '';
	let name = '';
	let password = '';

	let disabled = true;

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

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div>
	<div id="wrapper">
		<h2 class="text-2xl text-center font-semibold">Profile Settings</h2>

		<form
			on:submit={(e) => {
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
						successText = 'Successfully updated profile! Redirecting to login...';
						localStorage.removeItem('token');
						localStorage.removeItem('tokenExpires');

						setTimeout(() => {
							window.location.href = '/login';
						}, 5 * 1000);
					} else {
						errorText = 'Failed to update profile!';
					}
				});
			}}
		>
			<LoginInput name="Username" type="text" tooltip="Your new username" bind:value={username} />
			<LoginInput name="Name" type="text" tooltip="Your new name" bind:value={name} />
			<LoginInput
				name="Password"
				type="password"
				newPassword={true}
				tooltip="Your new password"
				bind:value={password}
			/>
			<SubmitButton value="Save" {disabled} />
		</form>

		{#if successText}
			<p class="text-light-success dark:text-dark-success">{successText}</p>
		{/if}
		{#if errorText}
			<p class="text-light-error dark:text-dark-error">{errorText}</p>
		{/if}
	</div>
</div>

<style>
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
</style>
