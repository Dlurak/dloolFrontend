<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import I18n from '$lib/I18n.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import Input from '$lib/auth/Input.svelte';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import { loadSchools } from '$lib/auth/loadSchools';
	import Box from '$lib/homework/Box.svelte';
	import { onMount } from 'svelte';
	import { i, type Token } from '../../languages/i18n';
	import { title } from '../stores';
	import { addToast } from '$lib/toast/addToast';

	let school = '';
	let classes = [''];

	let clipboardIsAvailable = false;

	let resultUrl = '';

	let resultType = 'calendar';

	let disabled = true;

	title.set('tricks');

	onMount(() => {
		clipboardIsAvailable = navigator.clipboard !== undefined;
	});

	$: resultUrl = `${PUBLIC_API_URL}/homework/${resultType}/${school}?classes=${classes.join(',')}`;
	$: {
		disabled = school === '' || classes.some((c) => c === '');
	}
</script>

<div class="flex gap-4 flex-col">
	<Box>
		<hs id="export"><I18n key="tricks.export" /></hs>
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
					<I18n>
						<Input
							type="text"
							name={i('school')}
							bind:value={school}
							autocomplete="off"
							list="schoolsList"
						/>
					</I18n>
					<SelectDataList id="schoolsList" loadFunction={loadSchools} searchParam={school} />
				</div>
				<div class="flex flex-col">
					{#each classes as _, index}
						<I18n>
							<Input
								type="text"
								name="{i('class')} {index + 1}"
								bind:value={_}
								autocomplete="off"
								list="classList"
							/>
						</I18n>
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
					<I18n>
						<SubmitButton
							value={i('tricks.export.copy')}
							onClick={(e) => {
								e.preventDefault();
								navigator.clipboard.writeText(resultUrl).then(() => {
									addToast({
										type: 'success',
										content: 'tricks.export.copy.success',
										duration: 5000
									});
								});
							}}
							{disabled}
						/>
					</I18n>
				{:else}
					<code class="mt-3">{resultUrl}</code>
				{/if}
			</div>
		</div>
	</Box>
	<hr />
	<div>
		<h2 id="install"><I18n key="tricks.install" /></h2>
		<p>
			<I18n key="tricks.install.text" />
		</p>
	</div>
</div>
