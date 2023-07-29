<script lang="ts">
	export let show = true;

	export let uri: string;
	export let boxIcon: string;
	export let title: string;
</script>

{#if show}
	<a href={uri} {title}>
		{#if boxIcon}
			<i class="bx {boxIcon}" />
		{:else}
			{title}
		{/if}
	</a>
{/if}

<style>
	a {
		height: 100%;
		box-sizing: border-box;

		padding: .75rem;

		position: relative;

		text-decoration: none;

		color: var(--text);
	}

	a::after {
		content: "";
		position: absolute;

		bottom: 0;
		left: 0;
		
		height: 2px;

		width: 0;

		background-color: var(--text);

		transition-property: width;
		transition-timing-function: var(--transition-timing-function);
		transition-duration: var(--transition-timing);
	}

	a:is(:focus, :hover, :active)::after {
		width: 100%;
	}
</style>