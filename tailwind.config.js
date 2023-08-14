/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				light: {
					text: 'hsl(0, 0%, 2%)',
					background: 'hsl(0, 0%, 98%)',
					primary: 'hsl(154, 49%, 22%)',
					secondary: 'hsl(153, 57%, 90%)',
					accent: 'hsl(154, 58%, 50%)',
					error: 'red',
					success: 'hsl(120, 74%, 30%)',
					link: '#0000ee'
				},
				dark: {
					text: 'hsl(0, 0%, 98%)',
					background: 'hsl(0, 0%, 12%)',
					primary: 'hsl(154, 49%, 22%)',
					secondary: 'hsl(153, 57%, 10%)',
					accent: 'hsl(154, 58%, 70%)',
					error: 'lightcoral',
					success: 'lightgreen',
					link: '#0c88f7'
				},
				'form-box-background': 'hsla(0, 0%, 5%, 0.2)'
			},
			gridTemplateColumns: {
				'box-list': 'repeat(auto-fill, minmax(20rem, 1fr))'
			},
			screens: {
				print: { raw: 'print' }
			}
		}
	},
	plugins: []
};