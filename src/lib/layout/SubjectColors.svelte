<script lang="ts">
	import { getLocalstorage, setLocalstorage } from '$lib/localstorage';
	import { onMount } from 'svelte';
	import { subjectColors } from '../../routes/stores';

    let readFromLocalstorage = false;

	subjectColors.subscribe((v) => {
		if (readFromLocalstorage) setLocalstorage('subjectColors', v);
	});

	onMount(() => {
        const locRes = getLocalstorage<Record<string, string>>('subjectColors', {})
        console.log(locRes)
        console.log(
            localStorage.getItem('subjectColors')
        )
		subjectColors.set(locRes);
        readFromLocalstorage = true;
	});
</script>
