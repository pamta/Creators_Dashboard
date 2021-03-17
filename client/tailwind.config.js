const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				teal: colors.teal, //you can add extended colors from tailwind https://tailwindcss.com/docs/customizing-colors
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
