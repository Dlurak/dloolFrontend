<script lang="ts">
	import { createDate } from '$lib/dates/createDateObject';
	import { getDateInInputFormat } from '$lib/dates/getDateInInputFormat';
	import DateLabel from './dateLabel.svelte';
	import type { CustomDate } from '../../types/customDate';
	import { createEventDispatcher, onMount } from 'svelte';
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../languages/i18n';

	const currentDate = new Date();

	export let dateObj: CustomDate = createDate(currentDate);
	export let date = getDateInInputFormat(new Date(dateObj.year, dateObj.month - 1, dateObj.day));

	let dateInput: HTMLInputElement;
	let isSafari = false;

	const dispatcher = createEventDispatcher();

	onMount(() => {
		isSafari = navigator.userAgent.toLocaleLowerCase().includes('safari');
	});

	$: {
		dateObj = createDate(new Date(date));
	}

	const setDate = () => {
		date = getDateInInputFormat(new Date(dateObj.year, dateObj.month - 1, dateObj.day));
	};

	$: {
		dateObj;
		setDate();
	}
</script>

<div class="row">
	<input
		type="date"
		bind:value={date}
		id={isSafari ? 'safari-date-picker' : 'heading-input'}
		bind:this={dateInput}
		on:input={() => {
			dispatcher('input', dateObj);
		}}
	/>
	{#if !isSafari}
		<DateLabel date={dateObj} />
		<I18n>
			<button
				on:click={(e) => {
					e.preventDefault();
					dateInput.showPicker();
				}}
				class="bx bx-calendar"
				title={i('datepicker.selectDate')}
			/>
		</I18n>
	{/if}
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	#heading-input {
		display: none;
	}

	#safari-date-picker {
		display: inline-block;
		width: 100%;

		background-color: transparent;
		color: var(--text);
		outline: none;
		border: none;
	}

	button {
		border: none;
		background-color: transparent;
		color: var(--text);
		font-size: 1.5rem;
	}
</style>
