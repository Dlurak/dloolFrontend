<script lang="ts">
	let height: number;
	let width: number;
	let offsetHeight: number;
	let offsetWidth: number;

	let showTooltip = false;
</script>

<a href="/">
	<div
		class="h-full"
		bind:clientHeight={height}
		bind:clientWidth={width}
		bind:offsetHeight
		bind:offsetWidth
		on:mouseleave={() => (showTooltip = false)}
		on:mouseenter={() => (showTooltip = true)}
		role="img"
		aria-label="Halloween"
	>
		<img
			src="/assets/pumpkin.svg"
			alt="Halloween"
			title="Dlool - Halloween"
			class="h-full object-contain"
		/>
	</div>
</a>

<div
	style="--offsetHeight: {height + offsetHeight / 2}px; --offsetWidth: {width}px;"
	class="fixed bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-md shadow-lg top-[var(--offsetHeight)] left-[var(--offsetWidth)]"
	class:hidden={!showTooltip}
	class:inline-block={showTooltip}
>
	<p>
		"
		<a
			target="_blank"
			rel="noopener noreferrer"
			href="https://svgsilh.com/ja/ffc107/image/1298797.html">かぼちゃ</a
		>
		" is marked with
		<a
			target="_blank"
			rel="noopener noreferrer"
			href="https://creativecommons.org/publicdomain/zero/1.0/?ref=openverse">CC0 1.0</a
		>.
	</p>
</div>
