<script>
	import { page } from '$app/stores';
	import { i } from '../../languages/i18n';
	import { currentLanguage, title } from '../../routes/stores';

	let tit = 'Dlool';

	let specificTitleToken = $title;
	title.subscribe((v) => (specificTitleToken = v));

	const setTitle = () => {
		if (specificTitleToken) {
			// @ts-expect-error The parts can be empty in this case, I can't achieve type-safety here T-T
			tit = `Dlool | ${i(specificTitleToken, {}, { transform: 'capitalize' })}`;
		} else {
			tit = 'Dlool';
		}
	};

	page.subscribe(() => setTitle());
	currentLanguage.subscribe(() => setTitle());
</script>

<svelte:head>
	<title>{tit}</title>
</svelte:head>
