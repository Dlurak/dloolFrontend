import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	layout: './src/lib/MarkdownLayout.svelte',

	remarkPlugins: [],
	rehypePlugins: []
});

export default config;
