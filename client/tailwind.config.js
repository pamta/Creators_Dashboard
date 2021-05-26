const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				teal: colors.teal, //you can add extended colors from tailwind https://tailwindcss.com/docs/customizing-colors
			},
			borderRadius: {
				DEFAULT: '0.25rem',
				md: '0.375rem',
			},
			width: {
				'9/10': '90%',
				'19/20': '95%',
			},
		},
		minWidth: {
			0: '0',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			full: '100%',
		},
		maxHeight: {
			0: '0',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			full: '100%',
		},
		maxWidth: {
			0: '0',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			full: '100%',
		},
		fontFamily: {
			labels: 'Montserrat',
		},
	},
	variants: {
		scrollbar: ['rounded'],
	},
	plugins: [require('tailwind-scrollbar')],
}
