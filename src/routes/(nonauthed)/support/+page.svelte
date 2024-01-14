<script lang="ts">
	import type { PageData } from './$types';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import SvelteSeo from 'svelte-seo';
	const Bitcoin: string = '1DdeZdeueHivKCHFbpfPhtUFhQBG2Vpxjr';
	const Litecoin: string = 'LVhjYCNZjQ7Kx7bMxVFhXD9DL34LiBwJRM';
	const Ethereum: string = '0x0F42506a5Ba4dbE3A632a88dB5Fb177f8cE30589';
	export let data: PageData;
	let copiedBtc = false;
	let copiedLtc = false;
	let copiedEth = false;
	function modalBTC(): void {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Bitcoin',
			image: '/bitcoin.jpg'

			// image: 'https://i.imgur.com/WOgTG96.gif'
		};
		modalStore.trigger(modal);
	}
	function modalLTC(): void {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Litecoin',
			image:
				'/ltc.jpg'

			// image: 'https://i.imgur.com/WOgTG96.gif'
		};
		modalStore.trigger(modal);
	}
	function modalETH(): void {
		const modal: ModalSettings = {
			type: 'alert',
			title: 'Ethereum',
			image: '/eth.jpg'

			// image: 'https://i.imgur.com/WOgTG96.gif'
		};
		modalStore.trigger(modal);
	}

	function onClickHandlerBtc(): void {
		copiedBtc = true;
		setTimeout(() => {
			copiedBtc = false;
		}, 1000);
	}
	function onClickHandlerLtc(): void {
		copiedLtc = true;
		setTimeout(() => {
			copiedLtc = false;
		}, 1000);
	}
	function onClickHandlerEth(): void {
		copiedEth = true;
		setTimeout(() => {
			copiedEth = false;
		}, 1000);
	}
</script>

<SvelteSeo
	title="Kato - Watch Anime online with DUB and SUB for FREE"
	description="Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! "
	canonical="https://kato.to/faq"
	keywords="Anime to watch, watch anime,anime online, free anime online, online anime, anime streaming, stream anime online, english anime, english dubbed anime, Sub anime, Dub anime, Ai, Kato"
	openGraph={{
		title: 'Kato - Watch Anime online with DUB and SUB for FREE',
		Image: 'https://www.kitsunee.me/icon.png',
		description:
			'Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! ',
		url: 'https://kato.to/faq',
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
<!-- Pages: Sign In: Boxed Alternate -->
<!-- Page Container -->
<div id="page-container" class="flex overflow-hidden flex-col mx-auto w-full min-w-[320px]">
	<!-- Page Content -->
	<main id="page-content" class="flex overflow-hidden flex-auto flex-col max-w-full">
		<div
			class=" flex items-center justify-center max-w-10xl mx-auto p-4 lg:p-8 w-full bg-gray-200/50 dark:bg-transparent"
		>
			<!-- Sign In Section -->
			<div
				class=" w-full max-w-6xl bg-secondary-500/20 lg:p-6 rounded-xl drop-shadow shadow-[#3A1D2B] shadow-lg"
			>
				<!-- Sign In Box -->
				<div
					class="flex flex-col md:flex-row rounded-lg shadow-sm bg-white overflow-hidden dark:text-gray-100 dark:bg-gray-800"
				>
					<!-- Sign In Form -->
					<section class="px-6 py-10 bg-surface-700 md:px-10 lg:p-16">
						<header class="text-center md:text-left mb-8 sm:mt-0">
							<h3 class="text-2xl font-bold mb-1">Support Kato's Anime Journey</h3>
							<h6 class="text-sm font-medium text-gray-500 dark:text-gray-400">
								Your donation will help us cover server and maintenance costs, ensuring that Kato's
								Anime website continues to provide quality content for anime fans everywhere.
							</h6>
						</header>
						<div class="donate flex flex-col gap-2">
							<span class="text-sm text-secondary-400"
								>Crypto: Please donate to Kato with wallet addresses below.</span
							>

							<div
								class="border-secondary-700 gap-1 flex flex-col bg-surface-600 border rounded-lg p-2 py-4"
							>
								<span class="opacity-80 flex justify-between"
									>Bitcoin<button
										on:click={modalBTC}
										class="border-secondary-700 border-opacity-50 border rounded"
									>
										<svg
											class="hi-outline hi-qr-code inline-block w-6 h-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
											/><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
											/></svg
										>
									</button>
								</span>
								<span class="flex justify-between"
									><span class="text-secondary-600 line-clamp-2"
										>1DdeZdeueHivKCHFbpfPhtUFhQBG2Vpxjr</span
									>
									<button
										class="border-secondary-700 border-opacity-50 border rounded"
										use:clipboard={Bitcoin}
										on:click={onClickHandlerBtc}
										>{#if !copiedBtc}
											<svg
												class="hi-outline hi-clipboard-document inline-block w-6 h-6"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
												/></svg
											>
										{:else}
											<svg
												class="hi-outline hi-check inline-block w-6 h-6"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M4.5 12.75l6 6 9-13.5"
												/></svg
											>
										{/if}</button
									></span
								>
							</div>
							<div
								class="border-secondary-700 gap-1 flex flex-col bg-surface-600 border rounded-lg p-2 py-4"
							>
								<span class="opacity-80 flex justify-between"
									>Litecoin<button
										on:click={modalLTC}
										class="border-secondary-700 border-opacity-50 border rounded"
										><svg
											class="hi-outline hi-qr-code inline-block w-6 h-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
											/><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
											/></svg
										></button
									>
								</span>
								<span class="flex justify-between"
									><span class="text-secondary-600 line-clamp-2"
										>LVhjYCNZjQ7Kx7bMxVFhXD9DL34LiBwJRM</span
									>
									<button
										class="border-secondary-700 border-opacity-50 border rounded"
										use:clipboard={Litecoin}
										on:click={onClickHandlerLtc}
										>{#if !copiedLtc}<svg
												class="hi-outline hi-clipboard-document inline-block w-6 h-6"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
												/></svg
											>{:else}
											<svg
												class="hi-outline hi-check inline-block w-6 h-6"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M4.5 12.75l6 6 9-13.5"
												/></svg
											>
										{/if}</button
									></span
								>
							</div>
							<div
								class="border-secondary-700 gap-1 flex flex-col bg-surface-600 border rounded-lg p-2 py-4"
							>
								<span class="opacity-80 flex justify-between"
									>Ethereum<button
										on:click={modalETH}
										class="border-secondary-700 border-opacity-50 border rounded"
										><svg
											class="hi-outline hi-qr-code inline-block w-6 h-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
											/><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
											/></svg
										></button
									>
								</span>
								<span class="flex justify-between"
									><span class="text-secondary-600 line-clamp-2"
										>0x0F42506a5Ba4dbE3A632a88dB5Fb177f8cE30589</span
									>
									<button
										class="border-secondary-700 border-opacity-50 border rounded"
										use:clipboard={Ethereum}
										on:click={onClickHandlerEth}
									>
										{#if !copiedEth}
											<svg
												class="hi-outline hi-clipboard-document inline-block w-6 h-6"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
												/></svg
											>{:else}
											<svg
												class="hi-outline hi-check inline-block w-6 h-6"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M4.5 12.75l6 6 9-13.5"
												/></svg
											>
										{/if}</button
									></span
								>
							</div>
						</div>
						<div class="text-sm text-gray-500 font-semibold mb-1 dark:text-gray-400 mt-10">
							<span>If you can't donate you can still support us by joining our discord </span>
							<a
								href="https://discord.gg/BzttGv2cc9"
								class=" inline-flex px-2 py-1 leading-4 text-sm rounded !text-white font-bold bg-primary-500"
								>Here</a
							>
						</div>
					</section>
					<!-- END Sign In Form -->

					<!-- END Sign In Extra -->
					<div
						class="relative px-6 py-10 md:px-10 lg:p-16 w-full flex items-end lg:bg-cover lg:bg-[url('/69.png')]"
					>
						<div class="absolute inset-0 bg-error-700 bg-opacity-30" />
						<div class="relative text-center sm:text-left">
							<p class="text-white font-extrabold shadow-inner leading-relaxed mb-2">
								Make A Donation to support the project and keep it alive!
							</p>
							<p class="text-sm font-bold text-secondary-200">Kato Dev Team</p>
						</div>
					</div>
					<!-- END Sign In Extra -->
				</div>
				<!-- END Sign In Box -->
			</div>
			<!-- END Sign In Section -->
		</div>
	</main>
	<!-- END Page Content -->
</div>
<!-- END Page Container -->
<!-- END Pages: Sign In: Boxed Alternate -->
