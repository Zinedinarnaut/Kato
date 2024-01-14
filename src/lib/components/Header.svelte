<script lang="ts">
	import { Avatar, type DrawerSettings } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import type { Search } from '$lib/simkl/types';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { PUBLIC_REDIRECT_URL, PUBLIC_SIMKL_ID } from '$env/static/public';
	import { afterNavigate } from '$app/navigation';
	import SearchPopup from './SearchPopup.svelte';
	import type { authed } from '$lib/types';
	export let auth: authed;
	$: auth;
	let queryTimeoutId: any;
	let value = '';
	let hideAll = false;
	let isSearching = false;
	let searchRes: Search[] | null = [];
	let search = false;
	$: isSearching;
	$: hideAll;
	$: value;
	$: searchRes;
	$: handleKeydown(value);
	afterNavigate(() => {
		hideAll = false;
	});

	const drawerSettings: DrawerSettings = {
		// Provide your property overrides:
		bgDrawer: 'bg-surface-backdrop-token text-white',
		bgBackdrop: 'bg-gradient-to-tr from-secondary-500/50 via-surface-500/50 to-secondary-500/50',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl',
		blur: 'backdrop-blur-sm',
		duration: 250
	};

	function drawerOpen() {
		drawerStore.open(drawerSettings);
	}

	function toggleSearch() {
		search = !search;
	}

	let popupSettings: PopupSettings = {
		event: 'focus-blur',
		target: 'search'
	};
	const popupFeatured: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'bottom'
	};
	function doSearch(query: string) {
		fetch('/api/search?q=' + query)
			.then((res) => res.json())
			.then((data) => {
				searchRes = data;
			})
			.finally(() => {
				isSearching = false;
			});
	}

	interface FormEventHandler<T> {
		target: EventTarget | null;
	}

	// $: activeClass = 'border-b-2 border-error-500 pb-[2px] font-semibold';
	$: activeClass = 'max-w-full';
	$: spanAnimationClass =
		'block group-hover:max-w-full transition-all duration-300 h-[2px] mt-[2px] bg-ascend bg-error-500';

	function handleKeydown(q: string) {
		const query = q;

		if (query.length <= 3 || !query) return;
		clearTimeout(queryTimeoutId);

		queryTimeoutId = setTimeout(() => {
			doSearch(query);
			isSearching = true;
		}, 250);
	}
</script>

<div
	role="menu"
	data-popup="popupFeatured"
	aria-labelledby="tk-dropdown"
	class="absolute right-0 origin-top-right w-48 shadow-xl rounded-lg dark:shadow-gray-900"
>
	<div
		class="bg-white ring-1 ring-black !z-100 ring-opacity-5 rounded-lg divide-y divide-gray-100 dark:bg-surface-500 dark:divide-surface-500 dark:ring-surface-500"
	>
		<div class="p-2.5 space-y-1 !z-100">
			<a
				role="menuitem"
				href="/profile"
				class="group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg !text-secondary-100 border border-transparent hover:text-rose-800 hover:bg-rose-50 active:border-rose-100 dark:text-gray-300 dark:hover:text-rose-100 dark:hover:bg-rose-500 dark:hover:bg-opacity-20 dark:active:border-rose-500 dark:active:border-opacity-25"
			>
				<svg
					class="flex-none hi-mini hi-user-circle inline-block w-5 h-5 opacity-25 group-hover:opacity-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
						clip-rule="evenodd"
					/></svg
				>
				<span class="grow">Profile</span>
			</a>
		</div>
		<div class="p-2.5 space-y-1">
			<a
				role="menuitem"
				href="javascript:void(0)"
				class="group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 !text-secondary-100 py-2 rounded-lg text-gray-700 border border-transparent hover:text-rose-800 hover:bg-rose-50 active:border-rose-100 dark:text-gray-300 dark:hover:text-rose-100 dark:hover:bg-rose-500 dark:hover:bg-opacity-20 dark:active:border-rose-500 dark:active:border-opacity-25"
			>
				<svg
					class="flex-none hi-mini hi-cog-6-tooth inline-block w-5 h-5 opacity-25 group-hover:opacity-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					><path
						fill-rule="evenodd"
						d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
						clip-rule="evenodd"
					/></svg
				>
				<span class="grow">Settings</span>
			</a>
		</div>
		<div class="p-2.5 space-y-1">
			<form>
				<button
					type="submit"
					role="menuitem"
					class="w-full text-left group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg text-gray-700 border border-transparent hover:text-rose-800 hover:bg-rose-50 active:border-rose-100 dark:text-gray-300 dark:hover:text-rose-100 dark:hover:bg-rose-500 dark:hover:bg-opacity-20 dark:active:border-rose-500 dark:active:border-opacity-25"
				>
					<svg
						class="flex-none hi-mini hi-lock-closed inline-block w-5 h-5 opacity-25 group-hover:opacity-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						><path
							fill-rule="evenodd"
							d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
							clip-rule="evenodd"
						/></svg
					>
					<span class="grow">Sign out</span>
				</button>
			</form>
		</div>
	</div>
	<div class="arrow bg-secondary-500" />
</div>
<!-- END Dropdown -->
<!-- svelte-ignore a11y-invalid-attribute -->
<SearchPopup {searchRes} {isSearching} {value} />

<AppBar
	background="md:bg-none  bg-surface-500 md:bg-opacity-0 "
	padding="md:px-20 px-2 py-4"
	border=""
	z-index="z-100"
>
	<svelte:fragment slot="lead">
		<div class=" flex items-center md:pr-10">
			<div
				class="absolute inset-0 flex flex-col justify-between h-40 pointer-events-none bg-gradient-to-b -z-1 from-secondary-900/60 via-secondary-900/40 to-transparent"
			/>
			<button class="mr-4 z-100 lg:hidden btn btn-sm" on:click={drawerOpen}>
				<span>
					<svg
						class="inline-block w-5 h-5 hi-mini hi-bars-3-bottom-left"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						><path
							fill-rule="evenodd"
							d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
							clip-rule="evenodd"
						/></svg
					>
				</span>
			</button>
			<a
				href="/"
				class="flex hover:rotate-2 duration-200 ease-in-out items-center hover:opacity-80 transition-all"
			>
				<img height="100" width="150" src={'/iconn.png'} alt="" class="" srcset="" />
				<!-- <img
					height="80"
					width="80"
					src={'//wsrv.nl/?url=' + 'https://www.kitsunee.me/icon.png' + '&h=80&w=80&output=webp'}
					alt=""
					class=""
					srcset=""
				/> -->
				<!-- <strong
					class="text-4xl lg:text-3xl 2xl:text-4xl uppercase font-asianImport text-primary-400-500-token"
					>Kato</strong
				> -->
			</a>
		</div>
		<div class="items-center flex">
			<ul
				class="space-x-2 2xl:space-x-4 hidden md:flex gap-3 text-sm 2xl:text-base font-light mt-[2px]"
			>
				<li class="hidden lg:block">
					<a href="/home" class={`transition group`}>
						<span>Home</span>
						<span
							class={`${spanAnimationClass} ${
								'/home' === $page.url.pathname ? activeClass : 'max-w-0'
							}`}
						/>
					</a>
				</li>
				<li class="hidden lg:block">
					<a href="/catalog" class={`transition group`}>
						<span>Catalog</span>
						<span
							class={`${spanAnimationClass} ${
								'/catalog' === $page.url.pathname ? activeClass : 'max-w-0'
							}`}
						/>
					</a>
				</li>
				<!-- <li>
					<a
						href="/Schedule"
						class={'/Schedule' === $page.url.pathname ? '!text-primary-500 font-semibold' : ''}
						>Schedule</a
					>
				</li> -->
				<li class="hidden lg:block">
					<a href="/collections" class={`transition group`}>
						<span>Collections</span>
						<span
							class={`${spanAnimationClass} ${
								'/collections' === $page.url.pathname ? activeClass : 'max-w-0'
							}`}
						/>
					</a>
				</li>
				<li class="hidden lg:block">
					<a href="/ai" class={`transition group`}>
						<span>Ai Tools</span>
						<span
							class={`${spanAnimationClass} ${
								$page.url.pathname.includes('ai') ? activeClass : 'max-w-0'
							}`}
						/>
					</a>
				</li>
				<li class="hidden lg:block">
					<a
						href="/faq"
						class={`transition group ${'/faq' === $page.url.pathname ? activeClass : ''}`}
					>
						<span>FAQ</span>
						<span
							class={`${spanAnimationClass} ${
								'/faq' === $page.url.pathname ? activeClass : 'max-w-0'
							}`}
						/>
					</a>
				</li>
			</ul>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<!-- Input with Icon prepend (large) -->
		<a href="https://discord.gg/kato" class="hover:animate-spin">
			<img
				src="https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png"
				class="w-10"
				alt=""
				srcset=""
			/>
		</a>
		<a
			href="/support"
			class="btn-sm lg:btn mr-3 md:mr-0 variant-filled-error !rounded-md max-[700px]:hidden"
			>Donate</a
		>

		<div class="space-y-1">
			<div class="relative">
				<div
					class="absolute inset-y-0 flex items-center justify-center w-12 my-px ml-px rounded-l-lg cursor-pointer -left-8 md:left-0 md:pointer-events-none"
				>
					<button on:click={toggleSearch}>
						<svg
							class="inline-block hi-mini fill-gray-500 hi-magnifying-glass lg:w-6 lg:h-6 w-7 h-7"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
							><path
								fill-rule="evenodd"
								d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
								clip-rule="evenodd"
							/></svg
						></button
					>
				</div>
				<input
					type="search"
					id="prepend_large"
					name="prepend_large"
					placeholder="Search"
					class="hidden py-3 pl-12 pr-5 leading-6 text-white border-none rounded-lg outline-none md:block placeholder-secondary-600 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-50 variant-filled-surface focus:border-primary-400 2xl:w-96 lg:w-72"
					use:popup={popupSettings}
					bind:value
				/>
			</div>
		</div>
		<!-- END Input with Icon prepend (large) -->

		{#if !hideAll}
			{#if !auth?.isAuthed}
				<button
					type="button"
					on:click={() => {
						goto(
							`https://simkl.com/oauth/authorize?response_type=code&client_id=${PUBLIC_SIMKL_ID}&redirect_uri=${PUBLIC_REDIRECT_URL}`
						);
					}}
					class="px-6 py-3 font-medium rounded-lg btn variant-filled-surface md:block"
					>Log In</button
				>
			{:else if auth?.isAuthed}
				<!-- Remove notifs for the time being as we dont have any -->
				<!-- <button class="btn-sm hidden lg:flex items-center gap-1 md:btn font-medium scale-105">
					<svg
						class="hi-mini hi-bell-alert inline-block w-7 h-7"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						><path
							d="M4.214 3.227a.75.75 0 00-1.156-.956 8.97 8.97 0 00-1.856 3.826.75.75 0 001.466.316 7.47 7.47 0 011.546-3.186zM16.942 2.271a.75.75 0 00-1.157.956 7.47 7.47 0 011.547 3.186.75.75 0 001.466-.316 8.971 8.971 0 00-1.856-3.826z"
						/><path
							fill-rule="evenodd"
							d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.94 32.94 0 003.256.508 3.5 3.5 0 006.972 0 32.933 32.933 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zm0 14.5a2 2 0 01-1.95-1.557 33.54 33.54 0 003.9 0A2 2 0 0110 16.5z"
							clip-rule="evenodd"
						/></svg
					>
				</button> -->

				<button use:popup={popupFeatured} class="!z-100 hover:opacity-80">
					<Avatar
						src={'//wsrv.nl/?url=' + auth.userSettings?.user.avatar + '&h=50&output=webp'}
						width="2xl:w-12"
						rounded="rounded-full"
					/>
				</button>
			{/if}
		{:else}
			<div class="placeholder-circle w-14 !z-100" />
			<button
				type="button"
				class="hidden py-3 !z-100 font-medium scale-105 rounded-lg btn variant-filled-primary hover:bg-primary-700 md:block"
				>Sign Up</button
			>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="headline"
		><input
			use:popup={popupSettings}
			bind:value
			class:hidden={!search}
			type="search"
			id="prepend_large"
			name="prepend_large"
			placeholder="Search"
			class=" w-full hidden py-3 leading-6 text-white border-none rounded-lg outline-none lg:hidden placeholder-primary-600 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-50 variant-ghost-primary ring-primary-500/20 ring-1 focus:border-primary-400"
		/></svelte:fragment
	>
</AppBar>
