<script lang="ts">
	import { Accordion, AccordionItem, SlideToggle } from '@skeletonlabs/skeleton';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	let locked: boolean = true;	import SvelteSeo from 'svelte-seo';
	function onNextHandler(e: any): void {
		console.log('event:next', e.detail);
	}
	function onBackHandler(e: any): void {
		console.log('event:prev', e.detail);
	}
	function onStepHandler(e: any): void {
		console.log('event:step', e.detail);
	}

	export let showModal: boolean = false;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

	function onCompleteHandler(e: any): void {
		dialog.close();
	}

	const onMouseDown = (e: any) => {
		showModal = true;
	};

	const loremIpsum =
		// cspell:disable-next-line
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eligendi quibusdam odit, temporibus ullam ab enim expedita eum officia ipsum, laboriosam, nobis quasi laborum aspernatur reiciendis dignissimos optio sunt distinctio.';
</script>
<SvelteSeo
	title="Kato - Best free anime to watch in HD quality "
	description="Kato is the first free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED!  "
	canonical="https://kato.to/faq"
	keywords="katotv, katoto, kato, watch anime,anime online, free anime online, online anime, anime streaming, stream anime online, english anime, english dubbed anime, ai tools, anime pfp, ai-chat, ai-tools"
	openGraph={{
		title: 'Kato - Best free anime to watch in HD quality ',
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
<img
	src="/98.png"
	alt=""
	class="absolute pointer-events-none object-cover !z-10 2xl:-left-7 inset-0 h-full opacity-40 lg:opacity-70"
	srcset=""
/>
<div class="flex justify-end !-z-1 overflow-hidden items-center">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<dialog
		bind:this={dialog}
		on:close={() => (showModal = false)}
		on:click|self={() => dialog.close()}
		class="collectionDialog !-z-1 variant-filled-surface rounded-[15px] drop-shadow-md focus:border-none focus:outline-none w-[90%] max-h-[90%] overflow-auto transition-all opacity-100"
	>
		<div
			class="w-full !-z-1 card variant-ghost-secondary backdrop-blur-lg !rounded-md p-4 text-token"
		>
			<Stepper
				on:next={onNextHandler}
				on:back={onBackHandler}
				on:step={onStepHandler}
				on:complete={onCompleteHandler}
				badge="variant-filled-surface rounded"
				active="rounded variant-filled-primary"
				buttonBack="variant-filled-secondary rounded-md"
				buttonNext="variant-filled-primary rounded-md"
				z-index="-z-1"
			>
				<Step>
					<svelte:fragment slot="header">Navigate to Simkl's Dashboard</svelte:fragment>
					<p>
						Head over to <u>simkl.com</u>, Sign in into your simkl account to begin importing anime
						from other providers.
					</p>
					<img
						src="https://cdn.discordapp.com/attachments/1072089086405398539/1107477052740878336/image.png"
						alt=""
						class="rounded-md"
						srcset=""
					/>
				</Step>
				<Step>
					<svelte:fragment slot="header">Access Simkl's Settings</svelte:fragment>
					<p>
						Once you're logged in, click on the <u>gear</u> icon in top right corner of your screen to
						access Simkl's settings.
					</p>
					<img
						src="https://cdn.discordapp.com/attachments/1072089086405398539/1107478038842724372/image.png"
						alt=""
						class="rounded-md"
						srcset=""
					/>
				</Step>
				<Step>
					<svelte:fragment slot="header">Find the Import Section</svelte:fragment>
					<p>
						In the Simkl settings menu, select the <code class="code">Import</code> section.
					</p>
					<img
						src="https://cdn.discordapp.com/attachments/1072089086405398539/1107478382192627742/image.png"
						alt=""
						class="rounded-md"
						srcset=""
					/>
				</Step>
				<Step>
					<svelte:fragment slot="header">Select Your Preferred Provider</svelte:fragment>

					<p>
						Simkl supports importing from a variety of anime providers, so choose the one that you
						want to import from.
					</p>
					<img
						src="https://cdn.discordapp.com/attachments/1072089086405398539/1107479439635386499/image.png"
						class="rounded-md w-96"
						alt=""
						srcset=""
					/>
				</Step>
				<Step>
					<svelte:fragment slot="header"
						>Check Kato profile to see if everything is imported 🎊</svelte:fragment
					>
					<p>
						After the import process is complete, check your <u>Kato</u> profile on Simkl to make sure
						that all your anime has been imported successfully.
					</p>
					<div class="flex gap-2">
						<img
							src="https://cdn.discordapp.com/attachments/1072089086405398539/1107480048002420866/localhost_5173_profileiPhone_12_Pro.png"
							class="rounded-md w-52"
							alt=""
							srcset=""
						/>
						<img
							src="https://cdn.discordapp.com/attachments/1072089086405398539/1107480621644783626/localhost_5173_profile_1.png"
							class="rounded-md hidden lg:flex w-[75%]"
							alt=""
							srcset=""
						/>
					</div>
				</Step>
			</Stepper>
		</div>
	</dialog>

	<Accordion
		rounded=""
		class="card lg:w-9/12 variant-glass-secondary  !z-1  3xl:!bg-secondary-backdrop-token  overflow-hidden p-4 !rounded-lg text-token "
	>
		<AccordionItem open>
			<svelte:fragment slot="lead"
				><svg
					class="bi bi-speedometer2 inline-block w-5 h-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 16 16"
					aria-hidden="true"
					><path
						d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"
					/><path
						fill-rule="evenodd"
						d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
					/></svg
				></svelte:fragment
			>
			<svelte:fragment slot="summary"
				><p class="font-bold text-primary-400 ">
					What is the rate limit for non-logged in users on the AI chat?
				</p></svelte:fragment
			>
			<svelte:fragment slot="content">
				<!-- prettier-ignore -->
				<p>
				The rate limit for non-logged in users on the AI chat is 20 messages per hour. If you need to send more messages, you must log in to your account to access the chat feature.
			</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead"
				><svg
					class="hi-outline hi-document-arrow-down inline-block w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
					/></svg
				></svelte:fragment
			>
			<svelte:fragment slot="summary"
				><p class="font-bold text-primary-400">
					What anime list websites can you import from if you log in?
				</p></svelte:fragment
			>
			<svelte:fragment slot="content">
				<!-- prettier-ignore -->
				<p>
				Which anime list websites can I import from if I log in to my account?
				A: If you log in to your account, you can import your anime list from a variety of websites, including Anilist, BetaSeries, Criticker, Crunchyroll, EpisodeCalendar, IMDB, Letterboxd, MyAnimeList, Netflix, Kitsu, trakt, TV Time, Tviso, and Twee. You can also import your anime list using a CSV or JSON file, or by using the API. <button  class="mt-3 flex items-center gap-1 btn-sm rounded-md variant-filled-primary" on:click={onMouseDown}><span>Tutorial</span><svg class="hi-outline hi-question-mark-circle inline-block w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg></button>
			</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead"
				><svg
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
				></svelte:fragment
			>
			<svelte:fragment slot="summary"
				><p class="font-bold text-primary-400">
					Are AI models currently available on the website for text-to-image generation?
				</p></svelte:fragment
			>
			<svelte:fragment slot="content">
				<!-- prettier-ignore -->
				<p>
				Currently, there are no AI models available on the website for text-to-image generation. However, the development team is actively working to implement this feature in the future.
			</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead"
				><svg
					class="hi-outline hi-question-mark-circle inline-block w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
					/></svg
				></svelte:fragment
			>
			<svelte:fragment slot="summary"
				><p class="font-bold text-primary-400">
					How can you continue watching an anime episode and where is the recent episode information
					saved?
				</p></svelte:fragment
			>
			<svelte:fragment slot="content">
				<!-- prettier-ignore -->
				<p>
				To continue watching an anime episode, you must first log in to your account. Once you watch an episode, your recent episode information will be saved in your local storage. However, the development team is working to improve this feature by adding a database, so your recent episodes will not be lost even if you clear your cache.
			</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead"
				><svg
					class="hi-outline hi-user-group inline-block w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
					/></svg
				></svelte:fragment
			>
			<svelte:fragment slot="summary"
				><p class="font-bold text-primary-400">
					Is there a community section on the website and how can users provide feedback?
				</p></svelte:fragment
			>
			<svelte:fragment slot="content">
				<!-- prettier-ignore -->
				<p>
				Yes, there is a community section on the website. You can join the website's Discord server to post suggestions and report any bugs you encounter. In the future, users will also have the option to upgrade their account for special perks, so it is recommended to join the community to stay updated on any new developments.
			</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead"
				><svg
					class="bi bi-badge-ad inline-block w-5 h-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 16 16"
					aria-hidden="true"
					><path
						d="m3.7 11 .47-1.542h2.004L6.644 11h1.261L5.901 5.001H4.513L2.5 11h1.2zm1.503-4.852.734 2.426H4.416l.734-2.426h.053zm4.759.128c-1.059 0-1.753.765-1.753 2.043v.695c0 1.279.685 2.043 1.74 2.043.677 0 1.222-.33 1.367-.804h.057V11h1.138V4.685h-1.16v2.36h-.053c-.18-.475-.68-.77-1.336-.77zm.387.923c.58 0 1.002.44 1.002 1.138v.602c0 .76-.396 1.2-.984 1.2-.598 0-.972-.449-.972-1.248v-.453c0-.795.37-1.24.954-1.24z"
					/><path
						d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
					/></svg
				></svelte:fragment
			>
			<svelte:fragment slot="summary"
				><p class="font-bold text-primary-400">
					Will there be ads on the website and what type of ads can users expect?
				</p></svelte:fragment
			>
			<svelte:fragment slot="content">
				<!-- prettier-ignore -->
				<p>
				Yes, the website will feature ads in the future to help pay for server costs and improve the overall anime streaming experience. However, the development team has no plans to add pop-up ads, and they will try to ensure that the ads are not intrusive to users. The type of ads that will be featured on the website is yet to be determined.
			</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead"
				><svg
					class="hi-outline hi-bug-ant inline-block w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082"
					/></svg
				></svelte:fragment
			>
			<svelte:fragment slot="summary"
				><p class="font-bold text-primary-400">
					Why is the website laggy or broken, and what can I do to fix it?
				</p></svelte:fragment
			>
			<svelte:fragment slot="content">
				<!-- prettier-ignore -->
				<p>
				The website may experience lag or have broken functionality due to potential bugs. If this occurs, you can try refreshing the page to resolve the issue. If the problem persists, you can contact the development team on Discord for further assistance.
			</p>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>
