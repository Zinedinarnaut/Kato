import adapter from '@sveltejs/adapter-vercel';

import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		inlineStyleThreshold: 5000
		//edge: true,
	},
	vitePlugin: {
		inspector: {
			// change shortcut
			toggleKeyCombo: 'x',
			// hold and release key to toggle inspector mode
			holdMode: true,
			// show or hide the inspector option
			// inspector position
			toggleButtonPos: 'top-right'
		}
	}
};

export default config;
