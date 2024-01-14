<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import SvelteSeo from 'svelte-seo';
	export let data;

	$: avatar = data?.authed?.userSettings?.user?.avatar;

	type ChatGPTMessage = {
		role: 'user' | 'system' | 'assistant';
		content: string;
	};

	type Message = {
		timestamp: string;
	} & ChatGPTMessage;

	let abortController: AbortController | null = null;

	let elemChat: HTMLElement;

	let isError = false;

	let userInput = '';
	let aiCurrentMessage = '';

	let messageHistory: {
		timestamp: any;
		role: 'user' | 'system' | 'assistant';
		content: string;
	}[] = [
		{
			role: 'system',
			timestamp: getCurrentTimestamp(),
			content: `
       <p><b>I'm sorry, but sometimes I may provide inaccurate information since I'm still a work in progress.</b></p>
      `
		}
	];

	$: conversationMessages = messageHistory;

	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function getCurrentTimestamp(): string {
		return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	}

	const parseData = (data: string) => {
		try {
			return JSON.parse(data);
		} catch (err) {
			return null;
		}
	};

	async function retry() {
		const currentResponse = await askGPT();

		if (!currentResponse) return;

		messageHistory = [
			...messageHistory,
			{
				content: currentResponse,
				role: 'assistant',
				timestamp: getCurrentTimestamp()
			}
		];

		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}

	async function askGPT() {
		try {
			isError = false;

			abortController = new AbortController();

			setTimeout(() => {
				scrollChatBottom('smooth');
			}, 100);

			aiCurrentMessage = 'thinking ...';

			const response = await fetch('https://api.kato.to/ai/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: `text/event-stream`
				},
				body: JSON.stringify(messageHistory),
				signal: abortController.signal
			});

			if (!response.ok || !response.body) {
				const t: ToastSettings = { message: 'Something went wrong, please try again' };
				toastStore.trigger(t);
				isError = true;
				return '';
			}

			const reader = response.body.getReader();

			let priorChunk = '';
			let currentResponse = '';

			aiCurrentMessage = '';

			while (true) {
				const { value, done } = await reader.read();

				if (done) break;

				const chunks = new TextDecoder().decode(value);

				(priorChunk + chunks)
					.split('\n\n')
					.filter(Boolean)
					.forEach((chunk) => {
						if (!chunk) return;

						if (chunk.includes('[DONE]')) return;

						const [_, rawData] = chunk.split('data: ');
						const parsedData = parseData(rawData);

						if (!parsedData) {
							//console.log(aiCurrentMessage, chunk) // live view the prompt incoming
							aiCurrentMessage += chunk;
							return;
						}
					});

				currentResponse = aiCurrentMessage;
			}

			aiCurrentMessage = '';
			return currentResponse;
		} catch (err) {
			console.log(err);
			const t: ToastSettings = {
				message: 'Something went wrong, please try again'
			};

			toastStore.trigger(t);

			isError = true;

			return '';
		}
	}

	async function addMessage() {
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);

		if (!userInput || aiCurrentMessage) {
			const t: ToastSettings = { message: 'Please wait for me to finish responding!' };
			toastStore.trigger(t);
			return;
		}

		const newMessage: Message = {
			role: 'user',
			content: userInput,
			timestamp: getCurrentTimestamp()
		};

		messageHistory = [...messageHistory, newMessage];
		userInput = '';

		const currentResponse = await askGPT();

		if (!currentResponse) {
			isError = true;

			return;
		}

		messageHistory = [
			...messageHistory,
			{
				content: currentResponse,
				role: 'assistant',
				timestamp: getCurrentTimestamp()
			}
		];

		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}

	function onPromptKeydown(event: KeyboardEvent): void {
		if (event.shiftKey) return;

		if (['Enter'].includes(event.code)) {
			addMessage();
		}
	}
</script>

<SvelteSeo
	title="Kato - Anime Experience with AI-Powered Tools: AI Chat, Text-To-Image"
	description="Discover the power of cutting-edge AI technology on Kato's anime website. Our anime AI`s offers three incredible tools to take your anime journey to the next level.  "
	canonical="https://kato.to/ai/chat"
	keywords="Discover the power of cutting-edge AI technology on Kato's anime website. Our anime AI`s offers three incredible tools to take your anime journey to the next level.  "
	openGraph={{
		title: 'Kato - Anime Experience with AI-Powered Tools: AI Chat, Text-To-Image',
		//@ts-ignore
		Image: 'https://www.kitsunee.me/icon.png',
		description:
			"Discover the power of cutting-edge AI technology on Kato's anime website. Our anime AI`s offers three incredible tools to take your anime journey to the next level. ",
		url: 'https://kato.to/ai/chat',
		type: 'website',
		site_name: 'Kato'
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@Kat0TV',
		title: 'Kato - Anime Experience with AI-Powered Tools: AI Chat, Text-To-Image',
		description:
			"Discover the power of cutting-edge AI technology on Kato's anime website. Our anime AI`s offers three incredible tools to take your anime journey to the next level.  ",
		image: 'https://www.kitsunee.me/icon.png'
	}}
/>
<section class="flex items-center justify-center w-full md:pt-0 h-full">
	<!-- markup (zero or more items) goes here -->
	<div class="w-11/12 card variant-ghost-surface rounded-xl !ring-surface-400/60">
		<div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr] rounded-xl">
			<!-- Navigation -->

			<div class="p-5 hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-400/60">
				<div class="">
					<h3 class="font-semibold">Oni AI</h3>

					<small>Your AI Assistant</small>

					<img src="/oni.png" alt="Oni hero" class="transform -scale-x-[1] opacity-70" />
				</div>
			</div>

			<div class="relative border-r border-surface-400/60">
				<!-- Chat -->
				<div class="flex flex-col justify-between h-[85vh]">
					<!-- Conversation -->
					<section bind:this={elemChat} class="p-4 overflow-y-auto space-y-4 grow">
						{#each conversationMessages as bubble, i}
							{#if bubble.role !== 'user'}
								<div class="grid grid-cols-[auto_1fr] gap-2">
									<Avatar
										src="//wsrv.nl/?url=https://www.kitsunee.me/icon.png&h=80&w=80&output=webp"
										width="w-12"
									/>
									<div
										class="card p-4 !variant-soft-surface rounded-tl-none space-y-2 rounded-xl !text-secondary-200"
									>
										<header class="flex justify-between items-center">
											<p class="font-bold">Oni</p>
											<small class="opacity-50">{bubble.timestamp}</small>
										</header>
										<div>{@html bubble.content}</div>
									</div>
								</div>
							{:else}
								<div class="grid grid-cols-[1fr_auto] gap-2">
									<div
										class="card p-4 rounded-tr-none space-y-2 variant-filled-secondary !text-secondary-200 rounded-xl"
									>
										<header class="flex justify-between items-center">
											<p class="font-bold">You</p>
											<small class="opacity-50">{bubble.timestamp}</small>
										</header>
										<div>{@html bubble.content}</div>
									</div>
									<Avatar
										src={avatar || undefined}
										initials={avatar ? undefined : 'User'}
										width="w-12"
									/>
								</div>
							{/if}
						{/each}

						{#if aiCurrentMessage}
							<div class="grid grid-cols-[auto_1fr] gap-2">
								<Avatar initials="Oni" width="w-12" />
								<div
									class="card p-4 !variant-soft-surface rounded-tl-none space-y-2 rounded-xl !text-secondary-200"
								>
									<header class="flex justify-between items-center">
										<p class="font-bold">Oni</p>
										<small class="opacity-50">{getCurrentTimestamp()}</small>
									</header>
									<div>{@html aiCurrentMessage}</div>
								</div>
							</div>
						{/if}
					</section>
					<!-- Prompt -->
					<section class="border-t border-surface-500 p-4">
						<div
							class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token"
						>
							<button class="input-group-shim">+</button>
							<textarea
								bind:value={userInput}
								class="bg-transparent border-0 ring-0 resize-none focus:ring-0"
								name="prompt"
								id="prompt"
								placeholder="Write a message..."
								on:keydown={onPromptKeydown}
							/>
							<button
								class={userInput ? 'variant-filled-secondary' : 'input-group-shim'}
								on:click={addMessage}
							>
								<svg
									class="hi-outline hi-paper-airplane inline-block w-6 h-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
									/></svg
								>
							</button>
						</div>
					</section>
				</div>

				{#if isError}
					<button
						on:click={retry}
						type="button"
						class="flex items-center justify-center gap-2 px-4 py-2 variant-filled-secondary !text-secondary-200 absolute bottom-32 left-1/2 -translate-x-1/2"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14Zm0 0V5v14Z"
							/></svg
						>

						<span> Retry </span>
					</button>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	/* your styles go here */
</style>
