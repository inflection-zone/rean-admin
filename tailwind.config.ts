import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import { customTheme } from './src/theme';
import { getThemeDarkColor } from './src/lib/themes/theme.selector';

//////////////////////////////////////////////////////////////////////////

const themeDarkColor = getThemeDarkColor();

//////////////////////////////////////////////////////////////////////////

module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
	 	join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
				strokeWidth: {
					'2': '4px',
				},
			backgroundImage: {
			'back-ground':
			`linear-gradient(to bottom, white 0%, white 35%, ${themeDarkColor} 35%, ${themeDarkColor} 100%)`,
			},
		},
	},
	plugins: [
		forms,
		skeleton({
			themes: {
				// preset: [
				// 	{
				// 		name: 'skeleton',
				// 		enhancements: true,
				// 	},
				// 	{
				// 		name: 'wintry',
				// 		enhancements: true,
				// 	},
				// 	{
				// 		name: 'modern',
				// 		enhancements: true,
				// 	},
				// 	{
				// 		name: 'hamlindigo',
				// 		enhancements: true,
				// 	},
				// 	{
				// 		name: 'rocket',
				// 		enhancements: true,
				// 	},
				// 	{
				// 		name: 'sahara',
				// 		enhancements: true,
				// 	},
				// 	{
				// 		name: 'gold-nouveau',
				// 		enhancements: true,
				// 	},
				// 	{
				// 		name: 'vintage',
				// 		enhancements: true,
				// 	},
				// 	{
				// 		name: 'seafoam',
				// 		enhancements: true,
				// 	},
				// 	{
				// 		name: 'crimson',
				// 		enhancements: true,
				// 	},
				// ],
				custom: [
					customTheme
				]
			}
		})
	],

} satisfies Config;
