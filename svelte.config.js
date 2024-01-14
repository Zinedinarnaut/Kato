import adapter from '@sveltejs/adapter-node';

import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
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
