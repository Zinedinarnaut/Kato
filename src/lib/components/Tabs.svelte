<script lang="ts">
	import { TabGroup, Tab, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { Info } from '$lib/simkl/types';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	let tabsBasic: number = 0;
	import type { Characters } from '$lib/anilist/types';
	export let data: {
		authed: authed;
		pathname: string;
		info: Info;
		characters: Characters | null;
		isInList: inList | null;
	};
	import CharacterCard from './CharacterCard.svelte';

	import { onMount } from 'svelte';
	import ItemCard from './ItemCard.svelte';
	import type { Episode } from '$lib/consumet/types';
	import type { inList } from '$lib/simkl/routes/auth/user/checkItemList';
	import type { authed } from '$lib/types';
	import Review from './infoPage/Review.svelte';
	$: data;

	onMount(async () => {});
	let desc = {
		books:
			'A written or printed work consisting of pages glued or sewn together along one side and bound in covers.',
		movies:
			'A story or event recorded by a camera as a set of moving images and shown in a theater or on television; a motion picture.',
		tv: 'A system for transmitting visual images and sound to screens, chiefly for entertainment, information, and education.'
	};
	export let justifyM: boolean = false;
</script>

<div class=" {justifyM ? 'mt-2' : 'mt-0'}">
	<TabGroup justify={justifyM ? 'justify-start' : 'justify-center'}>
		<!-- Tabs -->
		<Tab bind:group={tabsBasic} name="Characters" value={0}>Characters</Tab>
		<Tab bind:group={tabsBasic} name="Related" value={1}>Related</Tab>
		<Tab bind:group={tabsBasic} name="Comments" value={2}>Comments</Tab>

		<!-- Panel -->
		<svelte:fragment slot="panel">
			{#if tabsBasic === 0}
				<div class="flex gap-5 flex-wrap mx-auto md:mx-0 w-full">
					{#if data.characters}
						{#each data.characters?.data?.Media?.characters?.edges as character, i}
							<CharacterCard data={character} />
						{/each}
					{/if}
				</div>
			{:else if tabsBasic === 1}
				<!--  -->
				{#each data.info.users_recommendations as anime}
					<!-- <ItemCard data={anime} /> -->
				{/each}
			{:else if tabsBasic === 2}
				<Review />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
