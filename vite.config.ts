import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()]
	// server: {
	// 	proxy: {
	// 		'/advancedApi': {
	// 			target: 'http://localhost:5111',
	// 			changeOrigin: false,
	// 			rewrite: (path) => path.replace(/^\/advancedApi/, '')
	// 		},
	// 		'/vCGKaCaxOAJ7enL6VMM73iaw0VZrbx7sxRQSE6VtWybdjGSpawsGJljkQ2l2mxsKGU3DqgG31Okz25IuSb1xFdqB4B8NVv5lFRyorn9XRyvtcYmOJQtTsBUKF10tWEMX/webhook/update':
	// 			{
	// 				target: 'http://localhost:3111',
	// 				changeOrigin: false,
	// 				rewrite: (path) =>
	// 					path.replace('/vCGKaCaxOAJ7enL6VMM73iaw0VZrbx7sxRQSE6VtWybdjGSpawsGJljkQ2l2mxsKGU3DqgG31Okz25IuSb1xFdqB4B8NVv5lFRyorn9XRyvtcYmOJQtTsBUKF10tWEMX', '/site')

	// 			}
	// 	}
	// }
});
