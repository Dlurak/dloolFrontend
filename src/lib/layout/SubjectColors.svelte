<script lang="ts">
	import { getLocalstorage, setLocalstorage } from '$lib/localstorage';
	import { onMount } from 'svelte';
	import { subjectColors } from '../../routes/stores';
	import type { SubjectColor } from '../../types/subjectColors';

	let readFromLocalstorage = false;

	subjectColors.subscribe((v) => {
		if (readFromLocalstorage) setLocalstorage('subjectColors', v);
	});

	onMount(() => {
		const locRes = getLocalstorage<SubjectColor[]>('subjectColors', []);
		subjectColors.set(locRes);
		readFromLocalstorage = true;
	});
</script>
