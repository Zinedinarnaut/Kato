<script lang="ts">
	import { onMount } from 'svelte';

	let countdown: any;
	let nextEpisode: any;
	import { getArtRef, initPlayer } from './Utils/Player/player';
	import { autoSkip, settings } from '$lib/stores';
	import { browser } from '$app/environment';
	import type { Info } from '$lib/simkl/types';
	import type { Writable } from 'svelte/store';
	export let data: {
		info: Info;
		nextEpisodeDate: Date | undefined;
	};
	let artRef: Artplayer;
	let skip: boolean = false;
	function getUrlEpisode(): number {
		const newUrl = new URL(window.location.href);
		let number = Number(newUrl.searchParams.get('ep'));
		if (number) return number;
		return 0;
	}
	let episode = 0;
	setInterval(() => {
		if (browser) {
			episode = getUrlEpisode();
		}
	}, 1000);

	const getNextEpisodeDate = (data: any) => {
		const targetDate = new Date(data.nextEpisodeDate);
		const formattedTargetDate = targetDate.toLocaleString('en-US');

		return formattedTargetDate;
	};

	const updateCountdown = () => {
		if (!data.nextEpisodeDate) return;
		const now = new Date();
		const targetDate = new Date(data.nextEpisodeDate);
		//@ts-ignore
		const diff = targetDate - now;

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);

		countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
	};

	export let lightSwitch: Writable<boolean>;

	lightSwitch.subscribe((item) => console.log(item));
	console.log(data.info.status);
	console.log(data.nextEpisodeDate);
	onMount(() => {
		autoSkip.subscribe((item) => {
			skip = item;
			console.log(skip);
		});
		initPlayer();
		artRef = getArtRef();
		nextEpisode = getNextEpisodeDate(data);
		updateCountdown();

		const interval = setInterval(() => {
			if (data.nextEpisodeDate) {
				updateCountdown();
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="w-full h-auto aspect-video !-z-20 max-w-full kato-player" />

<section class="flex py-1 px-1 text-[10px] lg:text-xs justify-between">
	<div id="left-section" class="flex py-1 gap-1 lg:gap-4">
		<button
			class=" hidden lg:flex items-center gap-1"
			on:click={() => (artRef.fullscreen = !artRef.fullscreen)}
		>
			<svg
				class="hi-mini hi-arrows-pointing-out inline-block w-4 h-4"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
				><path
					d="M13.28 7.78l3.22-3.22v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69l-3.22 3.22a.75.75 0 001.06 1.06zM2 17.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 1.06L4.56 16.5h2.69a.75.75 0 010 1.5h-4.5a.747.747 0 01-.75-.75zM12.22 13.28l3.22 3.22h-2.69a.75.75 0 000 1.5h4.5a.747.747 0 00.75-.75v-4.5a.75.75 0 00-1.5 0v2.69l-3.22-3.22a.75.75 0 10-1.06 1.06zM3.5 4.56l3.22 3.22a.75.75 0 001.06-1.06L4.56 3.5h2.69a.75.75 0 000-1.5h-4.5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0V4.56z"
				/></svg
			>Expand</button
		>
		<button
			class="hidden lg:flex items-center gap-1"
			on:click={() => lightSwitch.set(!$lightSwitch)}
		>
			<svg
				class="hi-mini hi-light-bulb inline-block w-4 h-4"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
				><path
					d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z"
				/></svg
			>Light
			<span class={$lightSwitch === true ? 'text-success-500' : 'text-error-500'}
				>{$lightSwitch === true ? 'ON' : 'OFF'}</span
			></button
		>
		<button class="flex items-center gap-[2px]" disabled>
			Auto Play <span class="text-error-500">OFF</span></button
		>
		<button class="flex items-center gap-[2px]" disabled>
			Auto Next <span class="text-error-500">OFF</span></button
		>

		<button
			class="flex items-center gap-[2px]"
			on:click={() => {
				autoSkip.set(!skip);
			}}
		>
			Auto Skip Intro {#if !skip}
				<span class="text-error-500">OFF</span>
			{:else}<span class="text-success-500">ON</span>
			{/if}
		</button>
	</div>
	<div id="right-section" class="flex gap-4">
		<div class="flex gap-3">
			<div class="hidden lg:flex items-center gap-1">
				<svg
					class="hi-mini hi-backward inline-block w-4 h-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					><path
						d="M7.712 4.819A1.5 1.5 0 0110 6.095v2.973c.104-.131.234-.248.389-.344l6.323-3.905A1.5 1.5 0 0119 6.095v7.81a1.5 1.5 0 01-2.288 1.277l-6.323-3.905a1.505 1.505 0 01-.389-.344v2.973a1.5 1.5 0 01-2.288 1.276l-6.323-3.905a1.5 1.5 0 010-2.553L7.712 4.82z"
					/></svg
				><span>Prev</span>
			</div>
			<div class="hidden lg:flex items-center gap-1">
				<span>Next</span><svg
					class="hi-mini hi-forward inline-block w-4 h-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					><path
						d="M3.288 4.819A1.5 1.5 0 001 6.095v7.81a1.5 1.5 0 002.288 1.277l6.323-3.905c.155-.096.285-.213.389-.344v2.973a1.5 1.5 0 002.288 1.276l6.323-3.905a1.5 1.5 0 000-2.553L12.288 4.82A1.5 1.5 0 0010 6.095v2.973a1.506 1.506 0 00-.389-.344L3.288 4.82z"
					/></svg
				>
			</div>
		</div>
		<div class="flex items-center gap-1">
			<svg
				class="hi-mini hi-plus inline-block w-4 h-4"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
				><path
					d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
				/></svg
			><span>Add to List</span>
		</div>
		<div class="flex items-center gap-1">
			<svg
				class="hi-mini hi-signal inline-block w-5 h-5"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
				><path
					d="M16.364 3.636a.75.75 0 00-1.06 1.06 7.5 7.5 0 010 10.607.75.75 0 001.06 1.061 9 9 0 000-12.728zM4.697 4.697a.75.75 0 00-1.061-1.06 9 9 0 000 12.727.75.75 0 101.06-1.06 7.5 7.5 0 010-10.607z"
				/><path
					d="M12.475 6.465a.75.75 0 011.06 0 5 5 0 010 7.07.75.75 0 11-1.06-1.06 3.5 3.5 0 000-4.95.75.75 0 010-1.06zM7.525 6.465a.75.75 0 010 1.06 3.5 3.5 0 000 4.95.75.75 0 01-1.06 1.06 5 5 0 010-7.07.75.75 0 011.06 0zM11 10a1 1 0 11-2 0 1 1 0 012 0z"
				/></svg
			>
		</div>
	</div>
</section>
<div class="w-full flex flex-col lg:flex-row h-[120px]">
	<div
		class="lg:w-5/12 hidden lg:block w-full px-10 py-6 bg-secondary-600/50 leading-5 rounded-l-lg font-medium text-center h-full"
	>
		You're watching <span class="text-error-500 font-bold">Episode {episode + 1}</span>.<br />
		If you wish switch to Dub, click on<br />
		Load Dub.
	</div>
	<ul class=" h-full rounded-r-lg bg-secondary-500/20 w-full">
		<li class="border-b border-slate-500 border-dotted h-1/2 flex items-center w-full">
			<div class="text-white lg:h-1/2 w-3/4">
				<div class="flex items-center font-medium">
					<div class="pl-5 px-7 flex items-center gap-1">
						<svg
							class="bi bi-badge-cc-fill inline-block w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 16 16"
							aria-hidden="true"
							><path
								d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm3.027 4.002c-.83 0-1.319.642-1.319 1.753v.743c0 1.107.48 1.727 1.319 1.727.69 0 1.138-.435 1.186-1.05H7.36v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747C2.5 6.051 3.414 5 5.018 5c1.318 0 2.29.813 2.342 2v.11H6.213c-.048-.638-.505-1.108-1.186-1.108zm6.14 0c-.831 0-1.319.642-1.319 1.753v.743c0 1.107.48 1.727 1.318 1.727.69 0 1.139-.435 1.187-1.05H13.5v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.751 2.518-2.751 1.318 0 2.29.813 2.342 2v.11h-1.147c-.048-.638-.505-1.108-1.187-1.108z"
							/></svg
						><span>Sub</span>
					</div>
					<div class="flex gap-1">
						<button
							on:click={() => {
								settings.set({ isDub: false });
							}}
							class="btn-sm variant-ghost-secondary !font-base !text-xs rounded-md">Load Sub</button
						>
					</div>
				</div>
			</div>
		</li>
		<li class="   h-1/2 flex items-center w-full">
			<div class="text-white lg:h-1/2 w-3/4">
				<div class="flex items-center font-medium">
					<div class="pl-5 px-7 flex items-center gap-1">
						<svg
							class="hi-mini hi-microphone inline-block w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
							><path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" /><path
								d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"
							/></svg
						><span>Dub</span>
					</div>
					<div class="flex gap-1">
						<button
							on:click={() => {
								settings.set({ isDub: true });
							}}
							class="btn-sm variant-ghost-secondary !font-base !text-xs rounded-md">Load Dub</button
						>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
{#if data.info.status != 'ended' && data.nextEpisodeDate != null}
	<div class="w-full mt-2 px-2 hidden lg:block rounded-md py-3 bg-secondary-600/50">
		<svg
			class="hi-mini h hi-bell inline-block w-4 h-4"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
			><path
				fill-rule="evenodd"
				d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
				clip-rule="evenodd"
			/></svg
		>
		The next episode is predicted to arrive on {nextEpisode} ({countdown})
	</div>
{/if}
