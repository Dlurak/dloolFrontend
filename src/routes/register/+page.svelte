<script>
	import LoginInput from '$lib/LoginInput.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
</script>

<svelte:head>
	<title>Dlool | Register</title>
</svelte:head>

<div id="wrapper">
	<h3>Register now</h3>

	<form>
		<LoginInput type="text" name="username" tooltip="This is your username, it must be unique" />
		<LoginInput type="text" name="name" tooltip="This is your name, it doesn't need to be unique" />
		<LoginInput
			type="text"
			name="school"
			tooltip="This is your school. Insert the uniquename of your school, currently you can't figuere out what this is but soon"
		/>
		<LoginInput
			type="text"
			name="class"
			tooltip="This is your class. Insert the name of your class."
		/>
		<LoginInput
			type="password"
			newPassword={true}
			tooltip="This is your password, currently I don't require a secure password but you should choose a secure one"
		/>

        <SubmitButton value="Register" disabled/>
	</form>
</div>

<style>
	/* OVERALL LAYOUT*/

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

	form {
		display: grid;
		grid-template-columns: 1fr;
	}
</style>
