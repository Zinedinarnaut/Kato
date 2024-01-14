<script lang="ts">
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { fly } from 'svelte/transition';
	import { cubicOut, cubicIn } from 'svelte/easing';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	import { page } from '$app/stores';
	import { Toast, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/Header.svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { tweened } from 'svelte/motion';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	export let data;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let isLoading = false;
	const progress = tweened(0, {
		duration: 600,
		easing: cubicOut
	});
	beforeNavigate(() => {
		isLoading = true;
		progress.set(85);
	});
	afterNavigate(() => {
		isLoading = false;
		progress.set(0);
	});
</script>

<svelte:head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="theme-color" content="#22212C">
</svelte:head>
<Modal width="w-72" />
<Toast />

{#if isLoading}
	<div class="absolute inset-0 h-2 z-100">
		<ProgressBar
			track=" variant-filled-secondary"
			height="h-1"
			meter="bg-[#9580FF]"
			label="Progress Bar"
			value={$progress || 0}
			max={100}
		/>
	</div>
{/if}
<MobileMenu {data} />
<AppShell>
	<svelte:fragment slot="header">
		{#if $page.url.pathname !== '/'}
			<Header auth={data.authed} />
		{/if}
	</svelte:fragment>

	<div class="container 3xl:max-w-10xl mx-auto h-full">
		<slot />
	</div>
	<!-- ... -->
</AppShell>

<style>
</style>
