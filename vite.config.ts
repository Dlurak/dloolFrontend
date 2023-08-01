import { sveltekit } from '@sveltejs/kit/vite';
import inlangPlugin from '@inlang/sdk-js/adapter-sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [inlangPlugin(), sveltekit()]
});
