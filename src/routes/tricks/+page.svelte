<script>
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import Input from '$lib/auth/Input.svelte';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import { loadSchools } from '$lib/auth/loadSchools';
	import Box from '$lib/homework/Box.svelte';
	import { i } from '@inlang/sdk-js';
	import { onMount } from 'svelte';

	let school = '';
	let classes = [''];

	let clipboardIsAvailable = false;

	let resultUrl = '';

	let communicationText = '';

	let resultType = 'calendar';

	let disabled = true;

	onMount(() => {
		clipboardIsAvailable = navigator.clipboard !== undefined;
	});

	$: resultUrl = `${PUBLIC_API_URL}/homework/${resultType}/${school}?classes=${classes.join(',')}`;
	$: {
		disabled = school === '' || classes.some((c) => c === '');
	}
</script>

<svelte:head>
	<title>Dlool | {i('tricks')}</title>
</svelte:head>

<h2 id="export">{i('tricks.export')}</h2>
<Box>
	<div>
		<select
			class="bg-transparent w-full rounded-md border-2 border-gray-400 p-4"
			bind:value={resultType}
		>
			<option value="calendar">iCal</option>
			<option value="todo">Todo.txt</option>
		</select>
	</div>
	<div class="flex flex-col">
		<div class="flex flex-row gap-2">
			<div class="flex flex-col justify-start">
				<Input
					type="text"
					name={i('school')}
					bind:value={school}
					autocomplete="off"
					list="schoolsList"
				/>
				<SelectDataList id="schoolsList" loadFunction={loadSchools} searchParam={school} />
			</div>
			<div class="flex flex-col">
				{#each classes as _, index}
					<Input
						type="text"
						name="{i('class')} {index + 1}"
						bind:value={_}
						autocomplete="off"
						list="classList"
					/>
				{/each}
				<SelectDataList id="classList" loadFunction={loadClasses} searchParam={school} />
				<button
					on:click={(e) => {
						e.preventDefault();
						classes.push('');
						classes = classes;
					}}>+</button
				>
			</div>
		</div>
		<div class="flex flex-row justify-between items-center">
			<!--The clipboard API is only avialable with a secure origin-->
			{#if clipboardIsAvailable}
				<SubmitButton
					value={i('tricks.export.copy')}
					onClick={(e) => {
						e.preventDefault();
						navigator.clipboard.writeText(resultUrl).then(() => {
							communicationText = i('tricks.export.copy.success');
						});
					}}
					{disabled}
				/>
			{:else}
				<code class="mt-3">{resultUrl}</code>
			{/if}
		</div>
	</div>
	<p class="text-light-success dark:text-dark-success text-center mt-3">{communicationText}</p>
</Box>
