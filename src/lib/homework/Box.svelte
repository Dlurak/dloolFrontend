<script lang="ts">
	export let hideOnPrint = false;
	export let tailwindWidth: any = 80;
</script>

<div
	class="p-4 rounded-2xl bg-form-box-background w-{tailwindWidth} {hideOnPrint
		? 'print:hidden'
		: ''} print:bg-transparent print:border-b print:border-gray-400 print:pb-4 print:rounded-none print:pt-0 print:px-0"
>
	<slot />
</div>
