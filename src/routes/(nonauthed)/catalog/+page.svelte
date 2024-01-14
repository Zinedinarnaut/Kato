<script lang="ts">
	import LeftSection from '$lib/components/catalogPage/leftSection.svelte';
	import SearchConfig from '$lib/consumet/routes/AdvancedSearch/SearchConfig';
	import { getAnilistAdvancedSearch } from '$lib/consumet/routes/AdvancedSearch/advancedSearch';
	import type { cResult } from '$lib/consumet/routes/AdvancedSearch/types/cResponse.js';
	import sortFunctions from './utils/sort.js';
	import { SortTypes } from './types/SortTypes.js';
	import SvelteSeo from 'svelte-seo';
	import { onMount } from 'svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	let listElement: HTMLElement;
	const config = new SearchConfig();
	export let sortValue: SortTypes;
	export let data;
	let trending: cResult[] = data.trending.results ?? [];

	const sort = async () => {
		const sortFn = sortFunctions[sortValue];
		trending = trending.sort(sortFn);
	};

	const filter = async () => {
		if (config.Query) {
			const newUrl = new URL(window.location.href);
			newUrl.searchParams.set('q', config.Query);
			history.pushState(null, '', newUrl);
		}

		trending = (await getAnilistAdvancedSearch(config)).results;
		await sort();
	};

	onMount(() => {
		const pageElement = document.getElementById('page');
		let isLoading = false;
		pageElement?.addEventListener('wheel', async (event) => {
			const { scrollTop, scrollHeight, clientHeight } = pageElement;
			const isScrolledToBottom = scrollTop + clientHeight === scrollHeight;
			if (isLoading) return;
			if (isScrolledToBottom || (event.deltaY > 0 && scrollTop === 0)) {
				isLoading = true;
				console.log('loaded more data');
				console.log(config.Page);

				// Uncomment these lines to load more data when scrolled to the bottom or when scrolling up at the top
				config.Page++;
				const newTrending = (await getAnilistAdvancedSearch(config)).results;
				trending = [...trending, ...newTrending];

				await sort();

				setTimeout(() => {
					isLoading = false;
				}, 500);
			}
		});
	});

	interface HTMLEvent extends Event {
		target: HTMLInputElement;
	}

	const onInputChange: any = (e: HTMLEvent) => {
		const value = e?.target?.value ?? null;

		if (value) config.Query = encodeURI(value);
	};
</script>

<SvelteSeo
	title="Kato - Watch Anime online with DUB and SUB for FREE"
	description="Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! "
	canonical="https://kato.to/catalog"
	keywords="Anime to watch, watch anime,anime online, free anime online, online anime, anime streaming, stream anime online, english anime, english dubbed anime, Sub anime, Dub anime, Ai, Kato"
	openGraph={{
		title: 'Kato - Watch Anime online with DUB and SUB for FREE',
		//@ts-ignore
		Image: 'https://www.kitsunee.me/icon.png',
		description:
			'Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! ',
		url: 'https://kato.to/catalog',
		type: 'website',
		site_name: 'Kato'
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@Kat0TV',
		title: 'Kato - Watch Anime online with DUB and SUB for FREE',
		description:
			'Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! ',
		image: 'https://www.kitsunee.me/icon.png'
	}}
/>
<main
	id="page-content"
	class="flex flex-auto flex-col max-w-full px-20 max-[750px]:px-5 max-[750px]:mt-5"
	on:scroll={() => console.log('test')}
>
	<!-- Page Heading -->
	<div class="dark text-gray-100 hidden lg:block">
		<div class="container 3xl:max-w-9xl">
			<div class="flex items-center justify-between w-full py-2 border-t border-gray-700 mb-3 pt-3">
				<div class="flex-none">
					<h2 class="text-2xl shrink-0 font-semibold">Catalog</h2>
				</div>
				<div
					class="flex-none flex items-center justify-center sm:justify-end space-x-2 py-3 rounded sm:bg-transparent pl-2"
				>
					<!-- Form Elements: Select -->
					<form class="space-y-6 dark:text-gray-100">
						<!-- Select Box -->
						<div class="space-y-1">
							<select
								id="select"
								name="select"
								class="w-full block px-3 py-2 leading-6 rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 variant-filled-surface border-none focus:ring-opacity-50 dark:focus:border-pink-500"
								bind:value={sortValue}
								on:change={sort}
							>
								<option value="" selected disabled hidden>Choose sort</option>
								<option value={SortTypes.titleAsc}>title asc</option>
								<option value={SortTypes.titleDsc}>title dsc</option>
								<option value={SortTypes.yearAsc}>Year asc</option>
								<option value={SortTypes.yearDsc}>Year dsc</option>
								<option value={SortTypes.rankAsc}>Popularity Asc</option>
								<option value={SortTypes.rankDsc}>Popularity Dsc</option>
							</select>
						</div>
						<!-- END Select Box -->
					</form>
					<!-- END Form Elements: Select -->
				</div>
			</div>
		</div>
	</div>
	<!-- END Page Heading -->

	<!-- Page Section -->
	<div class="container" id="fasdfefdf" bind:this={listElement}>
		<div class="grid grid-cols-1 lg:grid-cols-12 2xl:gap-4">
			<!-- Main Content -->
			<!-- Side content -->
			<!--
				Visibility on mobile
					Closed        'hidden'
					Opened        '' (no class)
			-->

			<div class="lg:block order-first lg:order-first lg:col-span-2 overflow-hidden">
				<!--

				ADD YOUR SIDE CONTENT BELOW

				-->

				<!-- Placeholder -->
				<div class="flex items-center flex-col gap-4 max-[750px]:mb-5 relative overflow-hidden">
					<!-- <InputChip
							bind:value={list}
							on:add={onToggleChip}
							on:remove={onToggleChip}
							name="chips"
							chips="variant-filled-surface drop-shadow-lg"
							class={'text-primary-50'}
							placeholder="Filter by keywords..."
						/> -->
					<input
						type="search"
						placeholder="Search...."
						class="variant-filled-surface  overflow-hidden w-full !border-none rounded-[8px] !ring-0"
						on:keyup={onInputChange}
					/>
					<LeftSection {config} />
					<button
						on:click={filter}
						class="btn variant-filled-surface w-full rounded-[8px] hover:opacity-80 transition-all"
						>Filter</button
					>
				</div>

				<!--

				ADD YOUR SIDE CONTENT ABOVE

				-->
			</div>
			<!-- END Side content -->
			<div class="order-last lg:order-last 2xl:col-span-10 lg:col-span-8">
				<!--

				ADD YOUR MAIN CONTENT BELOW

				-->

				<!-- Placeholder -->
				<!-- TODO: make responsive -->
				<div
					class="grid grid-cols-2 gap-8 rounded-r-xl wrapper min-[760px]:flex flex-wrap content-between justify-between"
				>
					{#each trending as anime}
						{#key anime.id}
							<ItemCard {anime} />
						{/key}
					{/each}
				</div>

				<!--

				ADD YOUR MAIN CONTENT ABOVE

				-->
			</div>

			<!-- END Main Content -->
		</div>
	</div>

	<!-- END Page Section -->
</main>
