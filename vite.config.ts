import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			manifestFilename: 'manifest.json',
			workbox: {
				runtimeCaching: [
					{
						// Dlool-backend
						// ! When using a different backend it isn't enough to change the .env also change it here
						urlPattern: ({ url }) =>
							url.toString().startsWith('https://dlool-backend.onrender.com'),
						handler: 'NetworkFirst',
						method: 'GET',
						options: {
							cacheName: 'backend',
							expiration: {
								maxAgeSeconds: 60 * 60 * 24 * 7
							}
						}
					},
					{
						// api.github.com
						urlPattern: /^https:\/\/api\.github\.com/,
						handler: 'CacheFirst',
						method: 'GET',
						options: {
							cacheName: 'github',
							expiration: {
								maxAgeSeconds: 60 * 60 * 24 * 31
							}
						}
					}
				]
			}
		})
	]
});
