/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./app/**/*.{js,jsx,ts,tsx}",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"wood-primary": "#8B6F47",
				"wood-secondary": "#D4A574",
				"forest-green": "#6B8E23",
				"cream-bg": "#F5F5DC",
				"dark-brown": "#3E2723",
			},
		},
	},
	plugins: [],
}
