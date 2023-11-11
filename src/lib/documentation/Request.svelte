<script lang="ts">
	import Switch from '$lib/utils/Switch.svelte';
	import { backendUrl } from '../../stores';
	import { i } from '../../languages/i18n';
	import I18n from '$lib/I18n.svelte';

	// const methods = ['GET', 'POST', 'PUT', 'DELETE'] as const;
	const methods = ['GET'] as const;
	type Method = (typeof methods)[number];

	export let uri: string;
	export let method: Method = 'GET';
	export let urlParams: Record<
		string,
		{
			value: string;
			active: boolean;
		}
	> = {};

	const urlParamsToString = () => {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(urlParams)) {
			if (value.active) params.append(key, value.value);
		}
		return params.toString();
	};

	const genFullUrlString = () =>
		`${$backendUrl}/${uri}${urlParamsToString() ? '?' : ''}${urlParamsToString()}`;

	let fullUrlString = genFullUrlString();

	let jsonRes = '';
</script>

<div class="py-3 px-1">
	<div
		class="border-green-600 dark:border-green-400 bg-green-300 bg-opacity-20 border-2 border-solid rounded-md flex flex-col gap-2 items-start px-3 py-2"
	>
		<div class="flex flex-col justify-between w-full gap-2">
			<span
				class="rounded-md px-3 py-1 bg-gray-200 dark:bg-gray-600 bg-opacity-50 dark:bg-opacity-50 w-full"
			>
				{fullUrlString}
			</span>

			<div class="flex gap-2 w-full">
				<I18n>
					<select
						bind:value={method}
						class="rounded-sm px-2 py-1 bg-gray-200 dark:bg-gray-600 w-full"
						title={i('documentation.client.method')}
					>
						{#each methods as method}
							<option value={method}>{method}</option>
						{/each}
					</select>
					<button
						class="bg-emerald-300 dark:bg-emerald-700 px-3 py-1 text-lg rounded-md w-full shadow-md hover:shadow-xl focus:shadow-xl transition-all duration-300 active:shadow-2xl active:scale-[.98]"
						type="submit"
						on:click={async () => {
							const res = await fetch(fullUrlString, {
								method
							});
							jsonRes = await res.text();
						}}
						title={i('documentation.client.send')}
					>
						{i('documentation.client.send')}
					</button>
				</I18n>
			</div>
		</div>

		<div class="flex gap-3 flex-col w-full">
			<table class="border-collapse border border-slate-500">
				<thead>
					<tr>
						{#each [i('documentation.client.query.table.header.key'), i('documentation.client.query.table.header.value'), i('documentation.client.query.table.header.active')] as header}
							<th class="border border-slate-600 py-1 px-4">{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each Object.entries(urlParams) as [key, value]}
						<tr>
							<td class="border border-slate-600">{key}</td>
							<td class="border border-slate-600">
								<input
									type="text"
									bind:value={value.value}
									class="bg-gray-200 dark:bg-gray-600 px-2 py-1 w-full h-full"
									on:change={() => {
										fullUrlString = genFullUrlString();
									}}
								/>
							</td>
							<td class="border border-slate-600">
								<div class="flex items-center justify-center w-full h-full">
									<Switch
										bind:checked={value.active}
										on:change={() => {
											fullUrlString = genFullUrlString();
										}}
									/>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			{#if jsonRes}
				<div>
					<h4>Response</h4>
					<div class="bg-gray-200 dark:bg-gray-600 p-2 rounded-md line-clamp-[15] overflow-scroll">
						<pre class="text-sm max-w-3xl">{JSON.stringify(JSON.parse(jsonRes), null, 4)}</pre>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
