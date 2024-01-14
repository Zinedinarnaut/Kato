<script lang="ts">
	import { getLargePoster } from '$lib/simkl/routes/utils/images';
	import { slide } from 'svelte/transition';
	import { backInOut, linear } from 'svelte/easing';
	import {
		ConicGradient,
		modalStore,
		type ModalSettings,
		type ModalComponent,
		Modal
	} from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import { fade, fly } from 'svelte/transition';
	import type { Search } from '$lib/simkl/types';
	let options = { duration: 500, easing: backInOut };
	export let searchRes: Search[] | null = [];
	export let isSearching: boolean = false;
	export let value: string;
	import EasterEgg from '../easter/EasterEgg.svelte';
	const stopsSpinner: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-error-500))', start: 75, end: 100 }
	];
</script>

<div
	class="overflow-y-scroll w-[98.2%] md:w-72 2xl:w-96 p-0 m-0 rounded-lg card variant-filled-surface h-96 z-[1000000000]"
	in:slide={{ ...options }}
	data-popup="search"
>
	<div class="m-2">
		{#if searchRes != null && searchRes && searchRes.length !== 0}
			{#each searchRes as item, i}
				{#key item.ids.simkl_id}
					<a
						href="/watch/{item.ids.slug ?? item.title.replaceAll(' ', '-')}?id={item.ids.simkl_id}"
					>
						<div
							in:slide={{ ...options }}
							out:fade={{ duration: 0 }}
							class="{i % 2 === 0
								? 'bg-secondary'
								: 'variant-soft-secondary'} bg-tertiary-hover-token"
						>
							<li class="flex w-full h-24 hover:bg-themeTextSecondary/25 border-ascend">
								<!-- WTF
                height="300"
                width="200"	
                data-splide-lazy={'//wsrv.nl/?url=' + getLargePoster(item.poster) + '&w=200&h=300&output=webp'}
                src={'//wsrv.nl/?url=' + getLargePoster(item.poster) + '&w=200&h=300&output=webp'}
                class="object-cover pointer-events-none h-full w-auto overflow-hidden group-hover:scale-105 rounded-xl transition-transform duration-300 ease-in-out transform"
                alt="poster" -->
								<img
									height="96"
									width="80"
									data-splide-lazy={'//wsrv.nl/?url=' +
										getLargePoster(item.poster) +
										'&w=80&h=96&output=webp'}
									src={'//wsrv.nl/?url=' + getLargePoster(item.poster) + '&w=80&h=96&output=webp'}
									class="object-cover w-20 m-1 overflow-hidden rounded"
									alt="poster"
								/>
								<div class="flex flex-col justify-between w-full p-2 info">
									<div class="text-base text-slate-200 font-gothamMedium line-clamp-1">
										{item.title}
									</div>
									<div class="text-xs text-slate-400">{item.ep_count}</div>
									<div class="w-full">
										<ul class="flex items-center w-full gap-2 text-sm text-slate-500">
											<li>{item.status}</li>
											<i class="w-1 h-1 rounded-full dot bg-themeText" />

											<li class="text-teal-500">TV</li>
											<i class="w-1 h-1 rounded-full dot bg-themeText" />

											<li>{item.year}</li>
										</ul>
									</div>
								</div>
							</li>
						</div>
						<hr class="!border-t-4" />
					</a>
				{/key}
			{/each}
		{:else if value.length >= 3 && isSearching}
			<div class="flex justify-center absolute items-center w-full h-full">
				<ConicGradient stops={stopsSpinner} spin width="w-8" />
			</div>
		{/if}
	</div>
</div>
