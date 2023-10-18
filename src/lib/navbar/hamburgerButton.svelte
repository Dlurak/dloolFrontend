<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../languages/i18n';

	export let isOpened = false;

	$: {
		if (isOpened) {
			const domElements = [
				document.getElementsByTagName('main')[0],
				document.getElementsByTagName('footer')[0],
				document.getElementsByClassName('logo')[0],
				...document.getElementsByClassName('textOrIconLink')
			].filter((e) => e !== undefined);

			domElements.forEach((element) => {
				element.addEventListener(
					'click',
					() => {
						isOpened = false;
					},
					{ once: true }
				);
			});
		}
	}
</script>

<I18n>
	<button
		id="hamburgerButton"
		title={i('nav.hamburger', {}, { transform: 'capitalize' })}
		on:click={() => {
			isOpened = !isOpened;
		}}
		class:open={isOpened}
	>
		<span class="hamburgerLine top" />
		<span class="hamburgerLine middle" />
		<span class="hamburgerLine bottom" />
	</button>
</I18n>

<style>
	/* DEFINE VARIABLES */
	:root {
		--line-height: 10%;
	}

	/* STATIC SETUP */
	#hamburgerButton {
		height: 50%;
		aspect-ratio: 1;

		margin: 0;
		padding: 0rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		position: relative;

		border: none;
		background-color: transparent;
		border-radius: 2px;
	}

	.hamburgerLine {
		width: 100%;
		height: var(--line-height);
		position: relative;

		border-radius: 100vmax;

		background-color: var(--text);

		transition: all var(--transition-timing-function) var(--transition-timing);
	}

	.top,
	.bottom {
		position: absolute;
	}

	.top {
		top: 0;
	}
	.bottom {
		bottom: 0;
	}

	/* HOVER AND FOCUS STATE */

	#hamburgerButton:is(:focus):not(:focus-visible) {
		outline: none;
	}
	#hamburgerButton:is(:focus-visible) {
		outline: 1px solid var(--primary);
	}

	#hamburgerButton:is(:hover, :focus) > .middle {
		width: 0;
	}
	#hamburgerButton:is(:hover, :focus) > .top {
		top: calc(25% - calc(var(--line-height) / 2));
	}
	#hamburgerButton:is(:hover, :focus) > .bottom {
		bottom: calc(25% - calc(var(--line-height) / 2));
	}

	/* ACTIVE STATE */

	#hamburgerButton:is(:active, .open) > .middle {
		width: 0;
	}

	#hamburgerButton:is(:active, .open) > .top {
		top: calc(50% - calc(var(--line-height) / 2));
		transform-origin: center center;
		transform: rotate(45deg);
		width: 114%;
	}

	#hamburgerButton:is(:active, .open) > .bottom {
		bottom: calc(50% - calc(var(--line-height) / 2));
		transform-origin: center center;
		transform: rotate(-45deg);
		width: 114%;
	}
</style>
