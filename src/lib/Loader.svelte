<script lang="ts">
	export let type: 'inline' = 'inline'; // this is written like that to make it easier to add more types in the future
</script>

{#if type === 'inline'}
	{#if window.matchMedia('(prefers-reduced-motion: reduce)').matches}
		<p>...</p>
	{:else}
		<p>
			<span class="eye">◔</span>
			<span>_</span>
			<span class="eye">◔</span>
		</p>
	{/if}
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
