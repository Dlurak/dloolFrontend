<script lang="ts">
	export let hideOnPrint = false;
	export let id = '';
	export let fullHeight = false;
	export let rounded = true;
	export let secondary = false;
</script>

<div
	class="p-4 bg-light-box dark:bg-dark-box {hideOnPrint
		? 'print:hidden'
		: ''} print:bg-transparent print:border-b print:border-gray-400 print:pb-4 print:rounded-none print:pt-0 print:px-0 max-w-full @container"
	class:rounded-2xl={rounded}
	class:opacity-50={secondary}
	{id}
	class:h-full={fullHeight}
>
	<slot />
</div>
