/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }

			'3xl': '1920px'
		},
		extend: {
			maxWidth: {
				'3xl': '48rem',
				'8xl': '90rem',
				'9xl': '105rem',
				'10xl': '110rem',
				'11xl': '120rem'
			},
			fontFamily: {
				asianImport: ['onsenJapan', 'sans']
			},
			zIndex: {
				1: 1,
				10: 10,
				60: 60,
				70: 70,
				80: 80,
				90: 90,
				100: 100
			},
			typography: {
				DEFAULT: {
					css: {
						a: {
							textDecoration: 'none',
							'&:hover': {
								opacity: '.75'
							}
						},
						img: {
							borderRadius: defaultTheme.borderRadius.lg
						}
					}
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('flowbite/plugin'),

		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
		plugin(function ({ addUtilities }) {
			const utilBgPatterns = {
				'.pattern-dots-sm': {
					'background-image': 'radial-gradient(currentColor 0.5px, transparent 0.5px)',
					'background-size': 'calc(10 * 0.5px) calc(10 * 0.5px)'
				},
				'.pattern-dots-md': {
					'background-image': 'radial-gradient(currentColor 1px, transparent 1px)',
					'background-size': 'calc(10 * 1px) calc(10 * 1px)'
				},
				'.pattern-dots-lg': {
					'background-image': 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
					'background-size': 'calc(10 * 1.5px) calc(10 * 1.5px)'
				},
				'.pattern-dots-xl': {
					'background-image': 'radial-gradient(currentColor 2px, transparent 2px)',
					'background-size': 'calc(10 * 2px) calc(10 * 2px)'
				}
			};

			addUtilities(utilBgPatterns);
		})
	]
};
