<script lang="ts">
	import { createDate } from '$lib/dates/createDateObject';
	import { getDateInInputFormat } from '$lib/dates/getDateInInputFormat';
	import { i } from '@inlang/sdk-js';
	import DateLabel from './dateLabel.svelte';
	import type { CustomDate } from '../../types/customDate';
	import { onMount } from 'svelte';

	const currentDate = new Date();

	export let dateObj: CustomDate = createDate(currentDate);
	export let date = getDateInInputFormat(new Date(dateObj.year, dateObj.month - 1, dateObj.day));

	let dateInput: HTMLInputElement;
	let isSafari = false;

	onMount(() => {
		isSafari = navigator.userAgent.toLocaleLowerCase().includes('safari');
	});

	$: dateObj = createDate(new Date(date));
</script>

<div class="row">
	<input
		type="date"
		bind:value={date}
		id={isSafari ? 'safari-date-picker' : 'heading-input'}
		bind:this={dateInput}
	/>
	{#if !isSafari}
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
