<script lang="ts">
	import { i } from '@inlang/sdk-js';
	import { onMount } from 'svelte';

	export let type: 'password' | 'text';
	export let onInput: (e: Event) => void = () => {
		return;
	};
	export let newPassword = false;
	export let value = '';

	export let name: string;

	export let tooltip = '';

	export let showTooltip = false;

	let showPassword = false;
	let autocomplete =
		type === 'password' ? (newPassword ? 'new' : 'current') + '-password' : 'username';
	let passwordIconSolidString = 'bx';

	let inputField: HTMLInputElement;

	const handleShowPassword = (e: Event) => {
		e.preventDefault();
		showPassword = !showPassword;
		inputField.type = showPassword ? 'text' : 'password';
	};

	onMount(() => {
		inputField.type = type;
	});
</script>

<span>
	<input
		{name}
		placeholder=" "
		bind:this={inputField}
		bind:value
		{autocomplete}
		on:input={onInput}
		aria-labelledby="span > label"
	/>
	<label for={name}>{name}</label>

	{#if type === 'password'}
		<button
			title={`${showPassword ? i('input.password.hide') : i('input.password.show')}`}
			on:click={handleShowPassword}
			class="showPasswordButton"
			on:focus={() => (passwordIconSolidString = 'bxs')}
			on:blur={() => (passwordIconSolidString = 'bx')}
		>
			<i class={`bx ${passwordIconSolidString}-${showPassword ? 'hide' : 'show'}`} />
		</button>
	{/if}

	{#if tooltip}
		<button
			title={i('input.explaination')}
			on:click={(e) => {
				e.preventDefault();
				showTooltip = !showTooltip;
			}}
		>
			<i class="bx bx-question-mark" />
		</button>
	{/if}
</span>
{#if showTooltip}
	<p id="tooltipText">
		{tooltip}
	</p>
{/if}

<style>
	span {
		position: relative;
		width: 100%;

		margin-top: 30px;

		display: flex;
	}
	span::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;

		background-color: var(--text);
		opacity: var(--secondary-opacity);

		transition: all var(--transition);
	}
	span:focus-within::after,
	span > input:not(:placeholder-shown) + label::after {
		width: 100%;
	}

	input {
		display: inline-block;
		width: 100%;

		background-color: transparent;
		outline: none;
		border: none;

		padding-left: 2px;
		padding-right: 2px;
		padding-top: 5px;
		padding-bottom: 5px;

		font-size: 1.2rem;
		color: var(--text);

		z-index: 1;
	}

	label {
		text-transform: capitalize;
		position: absolute;

		top: 0;
		left: 0;

		font-size: 1.2rem;

		transition: all var(--transition);

		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	span:focus-within > label,
	span > input:not(:placeholder-shown) + label {
		transform: translateY(-100%);
		font-size: 0.8rem;
	}

	span > input:-webkit-autofill {
		transition: background-color 5000s ease-in-out 0s;
		-webkit-text-fill-color: var(--text);
	}

	button {
		background-color: transparent;
		border: none;
		outline: none;
		height: 100%;
		aspect-ratio: 1/1;
		font-size: 100%;
		color: var(--text);
	}
	button:focus {
		outline: none;
	}

	#tooltipText {
		text-align: start;
	}
</style>
