import Artplayer from 'artplayer';
import Consument from '$lib/consumet';
import type { Episode } from '$lib/consumet/types';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import playM3u8 from './playM3U8';
import { browser } from '$app/environment';
import removeTags from '$lib/utils/removeTags';
import { autoSkip } from '$lib/stores';
import { get } from 'svelte/store';
import Anify from '$lib/anify';
let artRef: Artplayer;
let introSkipStart: number | null = 0;
let introSkipEnd: number | null = 0;
let outroSkipStart: number | null = 0;
let outroSkipEnd: number | null = 0;
let introSkiped = false;
let outroSkiped = false;
export function initPlayer() {
	let font: string | null = null;
	try {
		font = localStorage.getItem('fontSize');
	} catch {
		console.log('error getting font size');
	}

	artRef = new Artplayer({
		container: '.kato-player',
		url: '',
		type: 'm3u8',
		customType: {
			m3u8: playM3u8
		},
		setting: true,
		playbackRate: true,
		aspectRatio: true,
		fullscreen: true,
		plugins: [
			artplayerPluginHlsQuality({
				// Show quality in control
				control: false,

				// Show quality in setting
				setting: true,

				// Get the resolution text from level
				getResolution: (level) => level.height + 'P',

				// I18n
				title: 'Quality',
				auto: 'Default'
			})
		],
		fullscreenWeb: true,
		autoplay: true,
		subtitleOffset: true,
		miniProgressBar: true,
		mutex: true,
		backdrop: true,
		playsInline: true,
		autoPlayback: true,
		airplay: true,
		theme: '#9580FF',
		lang: navigator.language.toLowerCase(),
		moreVideoAttr: {
			crossOrigin: 'anonymous'
		},

		settings: [
			{
				width: 200,
				html: 'Font Size',
				tooltip: 'Font Size',
				selector: [
					{
						default: font == '!text-sm',
						html: 'Small',
						fontSize: '!text-sm'
					},
					{
						default: font == '!text-base',
						html: 'Base',
						fontSize: '!text-base'
					},
					{
						default: font == '!text-lg',
						html: 'Large',
						fontSize: '!text-lg'
					},
					{
						default: font == '!text-xl',
						html: 'Extra Large',
						fontSize: '!text-xl'
					},
					{
						default: font == '!text-2xl',
						html: '2x Large',
						fontSize: '!text-2xl'
					},
					{
						default: font == '!text-5xl',
						html: '4x Large',
						fontSize: '!text-4xl'
					},
					{
						default: font == '!text-5xl',
						html: '5x Large',
						fontSize: '!text-5xl'
					}
				],
				onSelect: function (item) {
					console.log(item);
					localStorage.setItem('fontSize', item.fontSize);
					const subs = document.querySelector('.art-video-player .art-subtitle');
					console.log(subs);
					subs?.classList.remove(
						'!text-sm',
						'!text-base',
						'!text-lg',
						'!text-xl',
						'!text-2xl',
						'!text-4xl',
						'!text-5xl'
					);
					subs?.classList.add(item.fontSize);
					return item.html;
				}
			},
			{
				width: 200,
				html: 'Subtitle',
				tooltip: 'Bilingual',

				// icon: '<img width="22" heigth="22" src="/assets/img/subtitle.svg">',
				selector: [
					{
						html: 'Display',
						tooltip: 'Show',
						switch: true,
						onSwitch: function (item) {
							item.tooltip = item.switch ? 'Hide' : 'Show';
							artRef.subtitle.show = !item.switch;
							return !item.switch;
						}
					}
				],
				onSelect: function (item) {
					artRef.subtitle.switch(item.url, {
						name: item.html
					});
					return item.html;
				}
			}
		],
		highlight: [
			{
				time: 15,
				text: 'OP Start'
			},
			{
				time: 150,
				text: 'OP End'
			}
		],

		icons: {
			loading: `<img src="/player/loading.svg">`,
			indicator: '<img width="20" heigth="20" src="/player/indicator.svg">',
			state: '<img width="60" heigth="60" src="/player/state.svg">'
		}
	});
	const subs = document.querySelector('.art-video-player .art-subtitle');
	const fontSize = localStorage.getItem('fontSize');
	console.log(fontSize);
	artRef.on('video:timeupdate', () => {
		if (introSkipStart !== null && introSkipEnd !== null && get(autoSkip) && !introSkiped) {
			if (
				Math.floor(artRef.currentTime) >= introSkipStart &&
				Math.floor(artRef.currentTime) < introSkipEnd &&
				introSkipEnd !== null
			) {
				artRef.currentTime = introSkipEnd;
				introSkiped = true;
			}
		}
		if (outroSkipStart !== null && outroSkipEnd !== null && get(autoSkip) && !outroSkiped) {
			if (
				Math.floor(artRef.currentTime) >= outroSkipStart &&
				Math.floor(artRef.currentTime) < outroSkipEnd &&
				introSkipEnd !== null
			) {
				artRef.currentTime = outroSkipEnd;
				outroSkiped = true;
			}
		}
	});
	try {
		subs?.classList.add(fontSize ?? '');
	} catch {
		console.log('error setting font size');
	}
}

export function getArtRef() {
	return artRef;
}

export async function changeVidSrc(
	episode: number,
	episodes: Episode[],
	isDub: boolean,
	malId: string | null = null
) {
	introSkiped = false;
	outroSkiped = false;
	let skipTimes: SkipTime[] | null = null;

	if (malId) {
		skipTimes = await getSkipTime(malId, episode + 1);
	}

	console.log(skipTimes?.find((x) => x.skipType === SkipType.op)?.interval.startTime);
	console.log(episodes);
	const stream = await Consument.watch(episodes[episode].id, isDub);

	introSkipStart = skipTimes?.find((x) => x.skipType === SkipType.op)?.interval.startTime ?? null;
	introSkipEnd = skipTimes?.find((x) => x.skipType === SkipType.op)?.interval.endTime ?? null;
	outroSkipStart = skipTimes?.find((x) => x.skipType === SkipType.ed)?.interval.startTime ?? null;
	outroSkipEnd = skipTimes?.find((x) => x.skipType === SkipType.ed)?.interval.endTime ?? null;

	const highlights: { time: number; text: string }[] = [];

	if (introSkipStart !== null && introSkipEnd !== null) {
		highlights.push(
			{
				time: introSkipStart,
				text: 'OP Start'
			},
			{
				time: introSkipEnd,
				text: 'OP End'
			}
		);
	}

	if (outroSkipStart !== null && outroSkipEnd !== null) {
		highlights.push(
			{
				time: outroSkipStart,
				text: 'ED Start'
			},
			{
				time: outroSkipEnd,
				text: 'ED End'
			}
		);
	}
	if (browser) {
		const elements = document.getElementsByClassName('art-progress-highlight');
		for (let i = 0; i < elements.length; i++) {
			const spans = elements[i].getElementsByTagName('span');
			while (spans[0]) {
				spans[0].parentNode?.removeChild(spans[0]);
			}
		}
	}
	artRef.option.highlight = highlights;

	if (stream?.subtitles) {
		artRef.subtitle.switch(
			await makeSubsBlob(
				stream.subtitles.find((x) => x.lang === 'English')?.url ?? stream.subtitles[0]?.url ?? ''
			),
			{
				name: 'Default'
			}
		);
	}

	console.log(stream);

	let url = stream?.sources.find((x) => x.quality === 'auto' || x.quality === 'default')?.url;

	// Filter sources by quality and get the highest quality
	if (!url) {
		url =
			stream?.sources
				.filter((x) => x.quality !== 'auto' && x.quality !== 'default')
				.sort((a, b) => parseInt(b.quality) - parseInt(a.quality))[0]?.url ?? '';
	}

	await artRef.switchUrl('https://proxy2.vnxservers.com/proxy/m3u8/' + encodeURIComponent(url));

	return episode;
}
export async function changeVidSrcAnify(
	providerId: string,
	id: string,
	watchId: string,
	subType: string,
	episode: string | number
) {
	introSkiped = false;
	outroSkiped = false;

	const stream = await Anify.getAnimeSources(providerId, id, watchId, subType, episode);
	console.log(stream);
	introSkipStart = stream.intro.start;
	introSkipEnd = stream.intro.end;
	outroSkipStart = stream.outro.start;
	outroSkipEnd = stream.outro.end;

	const highlights: { time: number; text: string }[] = [];

	if (introSkipStart !== null && introSkipEnd !== null) {
		highlights.push(
			{
				time: introSkipStart,
				text: 'OP Start'
			},
			{
				time: introSkipEnd,
				text: 'OP End'
			}
		);
	}

	if (outroSkipStart !== null && outroSkipEnd !== null) {
		highlights.push(
			{
				time: outroSkipStart,
				text: 'ED Start'
			},
			{
				time: outroSkipEnd,
				text: 'ED End'
			}
		);
	}
	if (browser) {
		const elements = document.getElementsByClassName('art-progress-highlight');
		for (let i = 0; i < elements.length; i++) {
			const spans = elements[i].getElementsByTagName('span');
			while (spans[0]) {
				spans[0].parentNode?.removeChild(spans[0]);
			}
		}
	}
	artRef.option.highlight = highlights;

	if (stream?.subtitles) {
		artRef.subtitle.switch(
			await makeSubsBlob(
				stream.subtitles.find((x) => x.lang === 'English')?.url ?? stream.subtitles[0]?.url ?? ''
			),
			{
				name: 'Default'
			}
		);
	}

	console.log(stream);

	let url = stream?.sources.find((x) => x.quality === 'auto' || x.quality === 'default')?.url;

	// Filter sources by quality and get the highest quality
	if (!url) {
		url =
			stream?.sources
				.filter((x) => x.quality !== 'auto' && x.quality !== 'default')
				.sort((a, b) => parseInt(b.quality) - parseInt(a.quality))[0]?.url ?? '';
	}

	await artRef.switchUrl('https://proxy2.vnxservers.com/proxy/m3u8/' + encodeURIComponent(url));

	return episode;
}

async function makeSubsBlob(url: string): Promise<string> {
	if (!browser || url == '') return '';
	const request = await fetch(url);
	if (!request.ok) return '';
	const subs = removeTags(await request.text());

	const blob = new Blob([subs], { type: 'text/vtt' });
	const blobUrl = URL.createObjectURL(blob);
	console.log(blobUrl);
	return blobUrl;
}

async function getSkipTime(malId: string, episode: number | string) {
	let data: SkipTime[] | null = null;
	try {
		const response = await fetch(`https://api.streamable.moe/api/aniskip/${malId}/${episode}`);
		if (response.ok) {
			data = (await response.json()) as SkipTime[];
		}
	} catch {
		console.log('no skip times');
	}

	return data;
}

export interface SkipTime {
	interval: Interval;
	skipType: string;
	skipId: string;
	episodeLength: number;
}

export interface Interval {
	startTime: number;
	endTime: number;
}

enum SkipType {
	op = 'op',
	ed = 'ed',
	recap = 'recap',
	mixedOp = 'mixed-op'
}
