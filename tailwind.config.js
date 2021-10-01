const { spacing, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true
	},
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./layouts/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'soft-black': '#141415',
				'nav-gray': 'rgb(220,220,224)',
				'cool-gray': {
					light: 'rgb(39,39,38)',
					dark: 'rgb(39,39,58)'
				},
				like: {
					text: 'rgb(45,55,72)',
					bg: 'rgb(198, 246, 213)',
					dtext: 'rgb(154,230,180)',
					dbg: 'rgba(154,230,180, 0.16)'
				},
				dislike: {
					text: 'rgb(130,39,39)',
					bg: 'rgb(254,214,214)',
					dtext: 'rgb(254,178,178)',
					dbg: 'rgba(254,178,178, 0.16)'
				}
			},
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans]
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.700'),
						a: {
							color: theme('colors.blue.500'),
							'&:hover': {
								color: theme('colors.blue.700')
							},
							code: { color: theme('colors.blue.400') }
						},
						'h2,h3,h4': {
							'scroll-margin-top': spacing[32]
						},
						code: { color: theme('colors.pink.500') },
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after': false
					}
				},
				dark: {
					css: {
						color: theme('colors.gray.300'),
						a: {
							color: theme('colors.blue.400'),
							'&:hover': {
								color: theme('colors.blue.600')
							},
							code: { color: theme('colors.blue.400') }
						},
						blockquote: {
							borderLeftColor: theme('colors.gray.700'),
							color: theme('colors.gray.300')
						},
						'h2,h3,h4': {
							color: theme('colors.gray.100'),
							'scroll-margin-top': spacing[32]
						},
						hr: { borderColor: theme('colors.gray.700') },
						ol: {
							li: {
								'&:before': { color: theme('colors.gray.500') }
							}
						},
						ul: {
							li: {
								'&:before': { backgroundColor: theme('colors.gray.500') }
							}
						},
						strong: { color: theme('colors.gray.300') },
						thead: {
							color: theme('colors.gray.100')
						},
						tbody: {
							tr: {
								borderBottomColor: theme('colors.gray.700')
							}
						}
					}
				}
			})
		}
	},
	variants: {
		typography: ['dark']
	},
	plugins: [require('@tailwindcss/typography')]
};
