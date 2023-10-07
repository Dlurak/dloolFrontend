<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../languages/i18n';
	import type { ContributorType } from '../../types/Contributors';

	export let contributor: ContributorType;
	export let show = false;
	export let top = 0;
	export let left = 0;
</script>

{#if show}
	<div
		class="contributor-popover fixed bg-light-box dark:bg-dark-box rounded-md shadow-2xl p-3"
		style="--top: {top}px; --left: {left}px"
	>
		<div class="flex items-center gap-2">
			<img
				src={contributor.avatar_url}
				alt={contributor.login}
				height="48"
				width="48"
				class="rounded-full"
			/>
			<div>
				<h4>
					{contributor.login}
				</h4>
				{#if contributor.name}
					<p class="text-sm text-gray-600 dark:text-gray-400">{contributor.name}</p>
				{/if}
			</div>
		</div>
		{#if contributor.bio}
			<span class="line-clamp-2 whitespace-pre-line">{contributor.bio}</span>
		{/if}
		<hr class="my-2" />
		<table>
			<tbody>
				<tr>
					<td>
						<i class="bx bxl-github" />
					</td>
					<td>
						<a href="https://github.com/{contributor.login}">
							{contributor.login}
						</a>
					</td>
				</tr>
				{#if contributor.company}
					<tr>
						<td>
							<i class="bx bxs-factory" />
						</td>
						<td>
							{contributor.company}
						</td>
					</tr>
				{/if}
				{#if contributor.location}
					<tr>
						<td>
							<i class="bx bx-map" />
						</td>
						<td>
							{contributor.location}
						</td>
					</tr>
				{/if}
				{#if contributor.email}
					<tr>
						<td>
							<i class="bx bx-envelope" />
						</td>
						<td>
							<a href={`mailto:${contributor.email}`}>{contributor.email}</a>
						</td>
					</tr>
				{/if}
				{#if contributor.twitterUsername}
					<tr>
						<td>
							<i class="bx bxl-twitter" />
						</td>
						<td>
							<a href={`https://twitter.com/${contributor.twitterUsername}`}>
								{contributor.twitterUsername}
							</a>
						</td>
					</tr>
				{/if}
				{#if contributor.blog}
					<tr>
						<td>
							<i class="bx bx-link-external" />
						</td>
						<td>
							<a href={contributor.blog}>{contributor.blog}</a>
						</td>
					</tr>
				{/if}
			</tbody>
		</table>

		<hr class="my-2" />

		<I18n>
			{i('contributors.repos', { amount: `${contributor.publicRepos}` })}
		</I18n>
	</div>
{/if}

<style>
	.contributor-popover {
		top: var(--top);
		left: var(--left);

		max-width: min(80%, 36rem);

		z-index: 1000;
	}

	tr {
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	a {
		color: var(--text-color);
	}
</style>
