<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let currentPath: any;
	export let data: any;

	onMount(() => {
		currentPath = window.location.pathname;
	});

	function drawerClose(): void {
		drawerStore.close();
	}
	const links = [
		{
			name: 'ANIME',
			links: [
				{
					href: '/home',
					name: 'Homepage'
				},
				{
					href: '/catalog',
					name: 'Catalog'
				},
				// {
				// 	href: '/News',
				// 	name: 'Anime News'
				// },
				{
					href: '/collections',
					name: 'Collections'
				},
				{
					href: '/ai',
					name: 'AI-Tools'
				},
				{
					href: '/donate',
					name: 'Donate'
				}
			]
		}
	];

	if (data?.authed?.isAuthed) {
		links.push({
			name: 'ACCOUNT',
			links: [
				{
					href: '/profile',
					name: 'Profile'
				},
				{
					href: '/Settings',
					name: 'Settings'
				},
				{
					href: '/logout',
					name: 'Logout'
				}
			]
		});
	}
</script>

<Drawer zIndex="z-100">
	<div class="flex bg-secondary-backdrop-token items-center justify-between">
		<h2 class="p-5 flex justify-center items-center">
			<img src="/iconn.png" alt="Kato" class=" w-[130px]" />
		</h2>
		<button class="p-2" on:click={drawerClose}>
			<svg
				class="hi-mini hover:fill-primary-900 hi-chevron-double-left inline-block w-5 h-5"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
				><path
					fill-rule="evenodd"
					d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z"
					clip-rule="evenodd"
				/></svg
			></button
		>
	</div>
	<hr />
	<div class="overflow-y-auto">
		<div class="p-3 w-full">
			{#each links as link, i}
				<div>
					{#if link.name}
						<p class="text-secondary-400 pl-4 py-4">{link.name}</p>
					{/if}
					<div>
						{#each link.links as linkItem}
							<li class={` link ${currentPath == linkItem.href ? 'active' : null}`}>
								<a
									href={linkItem.href}
									on:click={drawerClose}
									class="group flex items-center space-x-2 !text-secondary-100 text-sm font-medium rounded-lg text-gray-800 border border-transparent hover:text-gray-900 hover:bg-blue-50 active:border-error-100 dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-secondary-500 dark:hover:bg-opacity-20 dark:active:border-tertiary-500 dark:active:border-opacity-25 py-2 px-1"
								>
									{#if linkItem.name == 'Homepage'}
										<svg
											class="hi-outline hi-home inline-block w-6 h-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
											/></svg
										>
									{/if}
									{#if linkItem.name == 'Catalog'}
										<svg
											class="hi-outline hi-book-open inline-block w-6 h-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
											/></svg
										>
									{/if}
									{#if linkItem.name == 'Anime News'}
										<svg
											class="hi-outline hi-globe-alt inline-block w-6 h-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
											/></svg
										>
									{/if}
									{#if linkItem.name == 'Collections'}
										<svg
											class="hi-outline hi-folder-open inline-block w-6 h-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
											/></svg
										>
									{/if}
									{#if linkItem.name == 'AI-Tools'}
										<svg
											class="bi bi-robot inline-block w-5 h-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 16 16"
											aria-hidden="true"
											><path
												d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"
											/><path
												d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"
											/></svg
										>
									{/if}
									{#if linkItem.name == 'Profile'}
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
										>
									{/if}
									{#if linkItem.name == 'Settings'}
										<svg
											class="hi-outline hi-cog-6-tooth inline-block w-6 h-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
											/><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/></svg
										>
									{/if}
									{#if linkItem.name == 'Logout'}
										<svg
											class="hi-outline hi-arrow-left-on-rectangle inline-block w-6 h-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
											/></svg
										>
									{/if}
									{#if linkItem.name == 'Donate'}
										<svg
											class="hi-outline hi-gift inline-block w-6 h-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
											/></svg
										>
									{/if}
									{linkItem.name}
								</a>
							</li>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</Drawer>

<style>
	.link {
		list-style: none;
		padding: 0.5rem 1rem;
		margin-bottom: 1rem;
	}
	.link.active {
		background: rgba(0, 0, 0, 0.4);
		border-radius: 8px;
	}

	.link a {
		font-size: 1.2rem;
	}
</style>
