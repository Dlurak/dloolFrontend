<script lang="ts">
	import { browser } from '$app/environment';

	export let type: 'inline' | 'circle' = 'inline';
</script>

{#if type === 'inline'}
	{#if browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches}
		<p>...</p>
	{:else}
		<p>
			<span class="eye">◔</span>
			<span>_</span>
			<span class="eye">◔</span>
		</p>
	{/if}
{:else if type === 'circle'}
	<div
		class="h-20 w-20 border-8 border-light-text dark:border-dark-text rounded-full border-t-light-primary dark:border-t-dark-primary animate-spin"
	/>
{/if}

<style>
	p {
		margin-block: 0;
	}

	.eye {
		display: inline-block;
		animation-name: rotate;
		animation-duration: 4s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	@keyframes rotate {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: 360deg;
		}
	}
</style>
