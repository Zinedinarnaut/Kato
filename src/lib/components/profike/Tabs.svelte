<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import type { authed } from '$lib/types';
	import type { Stats, WatchList } from '$lib/simkl/types';
	import Overview from './Overview.svelte';
	import ItemCard from '../ItemCard.svelte';
	export let profileData: {
		authed: authed;
		pathname: string;
		planToWatch: WatchList | null | undefined;
		finished: WatchList | null | undefined;
		List: WatchList | null | undefined;
		OnHOld: WatchList | null | undefined;
		Dropped: WatchList | null | undefined;
		stats: Stats | null | undefined;
	};
	$: profileData?.planToWatch?.anime;
	export let tabSet: number;
</script>

<TabGroup justify=" justify-start lg:justify-center">
	<Tab bind:group={tabSet} name="tab1" value={0}>
		<div class="flex max-w-2xl items-center gap-1">
			<svg
				class="hi-outline hi-eye inline-block w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
				/><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
				/></svg
			><span class="font-semibold">Watching</span><span class="font-light"
				>{profileData.List?.anime.length ?? 0}</span
			>
		</div></Tab
	>
	<Tab bind:group={tabSet} name="tab2" value={1}
		><div class="flex items-center gap-1">
			<svg
				class="hi-outline hi-bookmark inline-block w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
				/></svg
			><span class="flex gap-1 font-semibold"><span>To</span> Watch</span><span class="font-light"
				>{profileData.planToWatch?.anime.length ?? 0}</span
			>
		</div></Tab
	>
	<Tab bind:group={tabSet} name="tab3" value={2}
		><div class="flex items-center gap-1">
			<svg
				class="hi-outline hi-check inline-block w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
				><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg
			><span class="font-semibold">Watched</span><span class="font-light"
				>{profileData.finished?.anime.length ?? 0}</span
			>
		</div></Tab
	>
	<Tab bind:group={tabSet} name="tab4" value={3}
		><div class="flex items-center gap-1">
			<svg
				class="hi-outline hi-hand-raised inline-block w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
				/></svg
			> <span class="font-semibold">On Hold</span><span class="font-light"
				>{profileData.OnHOld?.anime.length ?? 0}</span
			>
		</div></Tab
	>
	<Tab bind:group={tabSet} name="tab5" value={4}
		><div class="flex items-center gap-1">
			<svg
				class="hi-outline hi-stop-circle inline-block w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
				/></svg
			><span class="font-semibold">Dropped</span><span class="font-light"
				>{profileData.Dropped?.anime.length ?? 0}</span
			>
		</div></Tab
	>
	<Tab bind:group={tabSet} name="tab6" value={5}
		><div class="flex items-center gap-1">
			<svg
				class="hi-outline hi-user inline-block w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
				/></svg
			><span class="font-semibold">Statistics</span><span class="font-light" />
		</div></Tab
	>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div class=" container pb-20 max-w-10xl mx-auto grid gap-3 md:gap-12 wrapper">
				{#if profileData.List}
					{#each profileData.List.anime as anime}
						<ItemCard anime={anime.show} />
					{/each}
				{/if}
			</div>
		{:else if tabSet === 1}
			<div class="container pb-20 max-w-10xl mx-auto grid gap-3 md:gap-12 wrapper">
				{#if profileData.planToWatch}
					{#each profileData.planToWatch.anime as anime}
						<ItemCard anime={anime.show} />
					{/each}
				{/if}
			</div>
		{:else if tabSet === 2}
			<div class="container pb-20 max-w-10xl mx-auto grid gap-3 md:gap-12 wrapper">
				{#if profileData.finished}
					{#each profileData.finished.anime as anime}
						<ItemCard anime={anime.show} />
					{/each}
				{/if}
			</div>
		{:else if tabSet === 3}
			<div class="container pb-20 max-w-10xl mx-auto grid gap-3 md:gap-12 wrapper">
				{#if profileData.OnHOld}
					{#each profileData.OnHOld.anime as anime}
						<ItemCard anime={anime.show} />
					{/each}
				{/if}
			</div>
		{:else if tabSet === 4}
			<div class="container pb-20 max-w-10xl mx-auto grid gap-3 md:gap-12 wrapper">
				{#if profileData.Dropped}
					{#each profileData.Dropped.anime as anime}
						<ItemCard anime={anime.show} />
					{/each}
				{/if}
			</div>
		{:else if tabSet === 5}
			<div class="container max-w-10xl lg:mx-auto">
				<!-- Stats Section: Card Links Contextual -->
				<Overview data={profileData} />
			</div>
		{/if}
	</svelte:fragment>
</TabGroup>

<style>
	.wrapper {
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		align-items: center;
		justify-items: center;
	}
</style>
