<script lang="ts">
	import { getLargeFanart, getLargePoster } from '$lib/simkl/routes/utils/images';
	import type { Show } from '$lib/simkl/types';
	export let data: Show[];
</script>

<section class="container w-full space-y-6 py-14 text-themeText">
	<div class="flex items-center justify-between">
		<div class="text-2xl border-l-4 pl-1 font-semibold text-white">Best Movies This Year</div>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a
			data-sveltekit-preload-data="hover"
			href="javascript:void(0)"
			class="flex items-center space-x-1 text-sm font-light no-underline transition group !text-white"
		>
			<span class="no-underline">See All</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5 transition ease-out opacity-50 group-active:translate-x-2 group-hover:opacity-100"
			>
				<path
					fill-rule="evenodd"
					d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
					clip-rule="evenodd"
				/>
			</svg>
		</a>
	</div>

	<nav class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
		<!-- Movie -->
		<!-- lol -->
		{#each data.filter((x) => x.fanart != '').slice(0, 4) as card}
			<div>
				<div
					class="overflow-hidden rounded-2xl hover:ring-4 hover:ring-secondary-500/80 active:opacity-75 active:ring-secondary-500/25"
				>
					<a
						data-sveltekit-preload-data="hover"
						href="/watch/{card.ids?.slug ?? card.title.split(' ').join('-')}?id={card.ids
							?.simkl_id ?? card.ids?.simkl}"
						class="relative transition rounded-2xl bg-black/25 group aspect-w-16 aspect-h-10"
					>
						<span
							class="absolute z-10 flex items-center gap-1 m-2 text-base font-medium badge-icon w-14 text-white bg-secondary-500/70 -top-0 -left-0"
							><svg
								class="inline-block w-4 h-4 hi-mini hi-star text-white fill-warning-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								><path
									fill-rule="evenodd"
									d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
									clip-rule="evenodd"
								/></svg
							>{card?.ratings?.mal?.rating}</span
						>
						<img
							loading="lazy"
							height="223"
							width="396"
							class="object-cover h-full transition duration-300 ease-out transform group-focus-within:scale-105 rounded-2xl group-hover:scale-105 group-focus:scale-105"
							src={'//wsrv.nl/?url=' +
								(card.fanart ? getLargeFanart(card.fanart) : getLargePoster(card.poster)) +
								'&w=396&h=223'}
							alt="trending anime"
						/>

						<div
							class="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-black/60 to-black rounded-[15px]"
						>
							<div class="flex items-end justify-start p-4 space-x-2" />
							<div class="flex items-end justify-between px-4 py-5 space-x-2">
								<div class="space-y-1">
									<div class="text-base text-white font-medium xl:text-[15px]">
										{card.title}
									</div>
								</div>

								<!-- <div
                        class=" hidden xl:flex absolute right-3 items-center justify-center w-10 h-10 rounded-full transition text-slate-400 bg-secondary group-hover:bg-[#312e30] group-hover:text-white group-hover:scale-110 group-active:scale-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="#007CFA"
                            class="h-5 w-5 hi-mini hi-play translate-x-0.5"
                        >
                            <path
                                d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                            />
                        </svg>
                    </div> -->
							</div>
						</div>
					</a>
				</div>
			</div>
		{/each}
	</nav>
</section>
