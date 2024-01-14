<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;
	onMount(async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any

		if (data.token) {
			document.cookie = `token=${data.token}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
		}
		window.location.href = '/';
		setTimeout(() => {
			window.location.reload();
		}, 5550);
	});
</script>
