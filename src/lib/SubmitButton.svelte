<script lang="ts">
	export let disabled: boolean;
	export let value: string;
</script>

<input type="submit" {value} {disabled} />

<style>
	input[type='submit'] {
		border: none;
		border-radius: 0.4rem;
		background-color: green;
		color: white;
		padding: 0.25rem;
		cursor: pointer;

		margin-top: 1rem;

		box-shadow: 0 0 2rem black;

		transition: all var(--transition-timing-function) var(--transition-timing);
	}

	input[type='submit']:not(:disabled):is(:hover, :focus) {
		translate: 0 -0.25rem;
		box-shadow: 0 15px 2rem black;

		outline: none;
	}

	input[type='submit']:active {
		transform: scale(0.95);
		box-shadow: 0 0 2.5rem black;
	}

	input[type='submit']:disabled {
		opacity: 0.7;
		box-shadow: none;
		cursor: not-allowed;
	}
</style>
