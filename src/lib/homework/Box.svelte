<script lang="ts">
	export let hideOnPrint = false;
	export let id = '';
</script>

<div
	class="p-4 rounded-2xl bg-light-box dark:bg-dark-box {hideOnPrint
		? 'print:hidden'
		: ''} print:bg-transparent print:border-b print:border-gray-400 print:pb-4 print:rounded-none print:pt-0 print:px-0 max-w-full"
	{id}
>
	<slot />
</div>
