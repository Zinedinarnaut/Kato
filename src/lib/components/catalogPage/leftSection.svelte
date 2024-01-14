<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { cGenres, cSeason, cFormat, cStatus } from '$lib/consumet/routes/AdvancedSearch/types';
	import type SearchConfig from '$lib/consumet/routes/AdvancedSearch/SearchConfig';
	let showAllGenres = false;
	function toggleGenres() {
		showAllGenres = !showAllGenres;
	}

	const animeGenres: cGenres[] = Object.values(cGenres); // Returns an array of all the enum values

	const seasonValues = Object.values(cSeason); // Returns an array of all the enum values
	const animeSeasons: cSeason[] = seasonValues.filter((value) => typeof value === 'string');

	const formatValues = Object.values(cFormat); // Returns an array of all the enum values
	const animeFormats: string[] = formatValues.filter((value) => typeof value === 'string');

	const statusValues = Object.values(cStatus); // Returns an array of all the enum values
	const animeStatus: string[] = statusValues.filter((value) => typeof value === 'string');

	export let config: SearchConfig;
	let genres: cGenres[] = [];

	interface HTMLEvent extends Event {
		target: HTMLInputElement;
	}

	const changeGenres: any = async (e: HTMLEvent) => {
		const target = e.target;
		let genre = animeGenres.find((value) => value === target.value);
		if (target.checked) {
			if (genre) {
				genres.push(genre);
				return (config.Genres = genres);
			}
		}
		if (genre) {
			const index = genres.indexOf(genre);
			if (index > -1) genres.splice(index, 1);
		}

		return (config.Genres = genres);
	};

	const changeSeason: any = (e: HTMLEvent) => {
		const season = e.target.value;
		config.Season = season as cSeason;
	};

	const changeFormat: any = (e: HTMLEvent) => {
		const format = e.target.value;
		config.Format = format as cFormat;
	};
	const changeStatus: any = (e: HTMLEvent) => {
		const status = e.target.value;
		config.Status = status as cStatus;
	};
</script>

<Accordion class="card variant-filled-surface w-full p-4 text-token rounded-[8px]">
	<AccordionItem>
		<svelte:fragment slot="summary"><p class="font-bold">Season</p></svelte:fragment>
		<svelte:fragment slot="content">
			<hr class="!border-t-2" />

			<div class="space-y-2">
				{#each animeSeasons as season}
					<label class="flex items-center space-x-2">
						<input
							class="checkbox checked:variant-filled-primary"
							type="radio"
							name="radio-direct"
							value={season}
							on:change={changeSeason}
						/>
						<p>{season}</p>
					</label>
				{/each}
			</div>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary"><p class="font-bold">Genres</p></svelte:fragment>
		<svelte:fragment slot="content">
			<hr class="!border-t-2" />
			<div class="space-y-2">
				<div class="space-y-2 grid-cols-1 grid" class:grid-cols-1={showAllGenres}>
					<!-- TODO: animations genres  -->
					{#each showAllGenres ? animeGenres : animeGenres.slice(0, 5) as genre}
						<label class="flex items-center space-x-2">
							<input
								class="checkbox checked:variant-filled-primary"
								type="checkbox"
								checked={genres.includes(genre) ? true : false}
								on:change={changeGenres}
								value={genre}
							/>
							<p>{genre}</p>
						</label>
					{/each}
					<!-- create a show more  -->
					{#if !showAllGenres}
						<button class="btn btn-primary flex items-center" on:click={toggleGenres}
							><span>Show All</span><svg
								class="hi-mini hi-chevron-down inline-block w-5 h-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								><path
									fill-rule="evenodd"
									d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
									clip-rule="evenodd"
								/></svg
							></button
						>
					{:else}
						<button class="btn btn-primary flex items-center" on:click={toggleGenres}
							><span>Show Less</span><svg
								class="hi-mini hi-chevron-up inline-block w-5 h-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								><path
									fill-rule="evenodd"
									d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
									clip-rule="evenodd"
								/></svg
							></button
						>
					{/if}
				</div>
			</div></svelte:fragment
		>
	</AccordionItem>
	<!-- <AccordionItem>
		<svelte:fragment slot="summary"><p class="font-bold">Studio</p></svelte:fragment>
		<svelte:fragment slot="content">
			<select class="select">
				{#each animeStudios as studio, i}
					<option value={i}>{studio}</option>
				{/each}
			</select>
		</svelte:fragment>
	</AccordionItem> -->
	<AccordionItem>
		<svelte:fragment slot="summary"><p class="font-bold">Type</p></svelte:fragment>
		<svelte:fragment slot="content">
			<div class="space-y-2">
				<div class="space-y-2 grid-cols-1 grid">
					<!-- TODO: animations genres  -->
					{#each animeFormats as type, i}
						<label class="flex items-center space-x-2">
							<input
								class="radio checked:variant-filled-primary"
								type="radio"
								name="radio-direct"
								value={type}
								on:change={changeFormat}
							/>
							<p>{type.replaceAll('_', ' ')}</p>
						</label>
					{/each}
				</div>
			</div></svelte:fragment
		>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary"><p class="font-bold">Airing Status</p></svelte:fragment>
		<svelte:fragment slot="content">
			<div class="space-y-2 grid-cols-1 grid">
				{#each animeStatus as status, i}
					<label class="flex items-center space-x-2">
						<input
							class="radio checked:variant-filled-primary"
							type="radio"
							name="radio-direct"
							value={status}
							on:change={changeStatus}
						/>
						<p>{status.replaceAll('_', ' ')}</p>
					</label>
				{/each}
			</div>
		</svelte:fragment>
	</AccordionItem>
</Accordion>
