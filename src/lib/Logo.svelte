<div id="wrapper">
	<div id="line">
		<span class="secondary" /> <span class="accent" /> <span class="primary" />
	</div>
	<div id="line">
		<span class="primary" /> <span class="secondary" /> <span class="primary" />
	</div>
	<div id="line">
		<span class="accent" /> <span class="secondary" /> <span class="accent" />
	</div>
</div>

<style>
	#wrapper {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-evenly;

		margin: 0;
		padding: 0;

		height: 100%;
		aspect-ratio: 1;
	}

	#line {
		width: 100%;
		height: 25%;

		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	span {
		height: 100%;
		aspect-ratio: 1;
	}

	.primary {
		background-color: var(--primary);
	}
	.secondary {
		background-color: var(--secondary);
	}
	.accent {
		background-color: var(--accent);
	}
</style>
