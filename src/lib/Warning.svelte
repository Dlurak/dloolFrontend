<div
	class="border-yellow-600 dark:border-yellow-400 bg-yellow-300 bg-opacity-20 border-2 border-solid rounded-md flex gap-2 items-center px-3 py-2 warning-box"
>
	<i class="bx bx-error text-4xl" />
	<span class="w-full">
		<slot />
	</span>
</div>

<style>
	.warning-box {
		box-shadow: 0 0 0.5rem 0 rgb(250, 204, 21);
	}
</style>
