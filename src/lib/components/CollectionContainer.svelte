<script lang="ts">
	import Collection from './Collection.svelte';
	import type { Show } from '$lib/simkl/types';
	import type { ICollection } from '$lib/simkl/types/Collection';
	export let data: ICollection[];
</script>

<section class="container w-full py-14 space-y-6 text-themeText">
	<div class="flex items-center justify-between">
		<div class="text-2xl border-l-4 pl-1 text-white font-semibold">Featured Collections</div>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a
			data-sveltekit-preload-data="hover"
			href="/collections"
			class="flex items-center text-sm no-underline transition group space-x-1 font-light !text-white"
		>
			<span>See All</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="h-5 w-5 group-active:translate-x-2 opacity-50 transition ease-out group-hover:opacity-100"
			>
				<path
					fill-rule="evenodd"
					d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
					clip-rule="evenodd"
				/>
			</svg>
		</a>
	</div>
	<nav class="grid wrapper gap-5">
		{#each data as collection}
			<Collection title={collection.title} descriptor="The Best of" items={collection.items} />
		{/each}
	</nav>
</section>

<style>
	.wrapper {
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}
</style>
