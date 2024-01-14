export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16')
];

export const server_loads = [0,2];

export const dictionary = {
		"/(nonauthed)": [~4],
		"/(nonauthed)/ai": [5],
		"/(nonauthed)/ai/chat": [~6],
		"/(nonauthed)/catalog": [~7],
		"/(nonauthed)/collections": [~8],
		"/(nonauthed)/faq": [9],
		"/(nonauthed)/home": [~10],
		"/(nonauthed)/login": [~11],
		"/(authed)/profile": [~3,[2]],
		"/(nonauthed)/schedule": [12],
		"/(nonauthed)/support": [13],
		"/(nonauthed)/test/easter": [14],
		"/(nonauthed)/test/[id]/[user]": [~15],
		"/(nonauthed)/watch/[slug]": [~16]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';