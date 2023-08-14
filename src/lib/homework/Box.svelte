<script lang="ts">
	export let hideOnPrint = false;
</script>

<div class="p-4 rounded-2xl bg-form-box-background {hideOnPrint ? 'print:hidden' : ''}">
	<slot />
</div>
