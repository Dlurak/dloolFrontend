<script lang="ts">
	import { createDate } from '$lib/dates/createDateObject';
	import { getDateInInputFormat } from '$lib/dates/getDateInInputFormat';
	import { i } from '@inlang/sdk-js';
	import DateLabel from './dateLabel.svelte';

	const currentDate = new Date();

	export let date = getDateInInputFormat(currentDate);
	export let dateObj: {
		day: number;
		month: number;
		year: number;
	} = createDate(currentDate);

	let dateInput: HTMLInputElement;

	$: dateObj = createDate(new Date(date));
</script>

<div class="row">
	<input
		type="date"
		bind:value={date}
		id={navigator.userAgent.toLocaleLowerCase().includes('safari')
			? 'safari-date-picker'
			: 'heading-input'}
		bind:this={dateInput}
	/>
	{#if !navigator.userAgent.toLocaleLowerCase().includes('safari')}
		<DateLabel date={dateObj} />
		<button
			on:click={(e) => {
				e.preventDefault();
				dateInput.showPicker();
			}}
			class="bx bx-calendar"
			title={i('datepicker.selectDate')}
		/>
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