<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import Box from '$lib/home/Box.svelte';
	import { boxes } from '../constants/home/boxes';
	import { i } from '../languages/i18n';
	import { title } from '../stores';

	title.set('home');

	let hoveredBoxIndex: number | null = null;
</script>

<div class="max-w-[min(80rem,95%)]">
	<section
		class="grid grid-cols-1 lg:grid-cols-[2fr,1fr] py-10 lg:py-24 break-after-page print:margin-0 print:p-0"
	>
		<div class="flex flex-col justify-center gap-3">
			<h1 class="text-4xl lg:text-5xl leading-tight break-words hyphens-auto">
				<span
					class="text-5xl lg:text-6xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent print:text-black"
				>
					Dlool
				</span><br />
				<I18n key="home.subtitle" />
			</h1>
			<h2 class="text-gray-500 hyphens-auto text-2xl lg:text-3xl">
				<I18n key="home.digitalEra" />
			</h2>

			<div class="print:hidden flex flex-wrap text-lg py-2 gap-4">
				<a
					href="/documentation/getting-started"
					class="bg-emerald-500 px-4 text-light-text dark:text-dark-text py-1 rounded-full shadow-md"
				>
					<I18n key="home.quick.getStarted" />
				</a>
				<a
					href="#why"
					class="border px-4 py-1 rounded-full shadow-md text-light-text dark:text-dark-text"
				>
					<I18n key="home.quick.why" />
				</a>
				<a
					href="https://github.com/Dlurak/dloolFrontend"
					class="border px-4 py-1 rounded-full text-light-text dark:text-dark-text shadow-md flex items-center gap-1"
				>
					<i class="bx bxl-github" />
					<I18n key="home.quick.github" />
				</a>
			</div>
		</div>

		<div class="p-10 xl:p-14 hidden lg:block">
			<div class="rounded-full shadow-green-500 shadow-2xl print:shadow-none">
				<I18n>
					<img src="/assets/dloolLogo.svg" alt={i('home.logo.alt')} />
				</I18n>
			</div>
		</div>
	</section>

	<section
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full"
		id="why"
	>
		{#each boxes as box, index}
			<div
				aria-roledescription="Tiles of a grid of features"
				role="grid"
				tabindex={-1}
				class="h-full"
				on:mouseenter={() => {
					hoveredBoxIndex = index;
				}}
				on:mouseleave={() => {
					hoveredBoxIndex = null;
				}}
			>
				<Box
					emoji={box.emoji}
					title={box.title}
					description={box.description}
					disfoccused={hoveredBoxIndex !== null && hoveredBoxIndex !== index}
				/>
			</div>
		{/each}
	</section>

	<section class="pt-12">
		<h2 class="hyphens-auto"><I18n key="home.homeworkBut" /></h2>

		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-lg gap-5">
			<div>
				<h3
					class="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent print:text-black"
				>
					<I18n key="home.homeworkBut.collaborative" />
				</h3>
				<ul>
					<li><I18n key="home.homeworkBut.collaborative.1" /></li>
					<li><I18n key="home.homeworkBut.collaborative.2" /></li>
					<li><I18n key="home.homeworkBut.collaborative.3" /></li>
					<li><I18n key="home.homeworkBut.collaborative.4" /></li>
					<li><I18n key="home.homeworkBut.collaborative.5" /></li>
				</ul>
			</div>
			<div>
				<h3
					class="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent print:text-black"
				>
					<I18n key="home.homeworkBut.convenient" />
				</h3>
				<ul>
					<li><I18n key="home.homeworkBut.convenient.1" /></li>
					<li><I18n key="home.homeworkBut.convenient.2" /></li>
					<li><I18n key="home.homeworkBut.convenient.3" /></li>
					<li><I18n key="home.homeworkBut.convenient.4" /></li>
					<li><I18n key="home.homeworkBut.convenient.5" /></li>
				</ul>
			</div>
			<div>
				<h3
					class="kbg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent print:text-black"
				>
					<I18n key="home.homeworkBut.free" />
				</h3>
				<ul>
					<li><I18n key="home.homeworkBut.free.1" /></li>
					<li><I18n key="home.homeworkBut.free.2" /></li>
					<li><I18n key="home.homeworkBut.free.3" /></li>
					<li><I18n key="home.homeworkBut.free.4" /></li>
				</ul>
			</div>
		</div>
	</section>

	<section class="pt-5 print:hidden">
		<div class="flex items-center gap-2 py-3">
			<span class="bg-gradient-to-r from-transparent to-gray-600 w-full h-0.5 rounded-full" />
			<span class="whitespace-nowrap"><I18n key="home.more" /></span>
			<span class="bg-gradient-to-l from-transparent to-gray-600 w-full h-0.5 rounded-full" />
		</div>
		<div class="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
			<a
				href="https://github.com/Dlurak/dloolFrontend"
				class="flex flex-col justify-center items-center gap-1 text-light-text dark:text-dark-text"
			>
				<i class="bx bxl-github text-3xl" />
				<I18n key="home.more.gh.frontend" />
			</a>
			<a
				href="https://github.com/Dlurak/dloolBAckend"
				class="flex flex-col justify-center items-center gap-1 text-light-text dark:text-dark-text"
			>
				<i class="bx bxl-github text-3xl" />
				<I18n key="home.more.gh.backend" />
			</a>
			<a
				href="https://mastodon.social/tags/dlool"
				class="flex flex-col justify-center items-center gap-1 text-light-text dark:text-dark-text"
			>
				<i class="bx bxl-mastodon text-3xl" />
				<I18n key="home.more.mastodon" />
			</a>
			<a
				href="https://media.ccc.de/v/37c3-lightningtalks-58009-dlool-schulplaner-fr-das-digitale-zeitalter"
				class="flex flex-col justify-center items-center gap-1 text-light-text dark:text-dark-text text-center"
			>
				<i class="bx bxs-camera-movie text-3xl" />
				<I18n key="home.more.ccc" />
			</a>
		</div>
	</section>
</div>
