import Hls from 'hls.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function playM3u8(video, url, art) {
	if (Hls.isSupported()) {
		const hls = new Hls();
		hls.loadSource(url);
		hls.attachMedia(video);

		// optional
		art.hls = hls;
		art.once('url', () => hls.destroy());
		art.once('destroy', () => hls.destroy());
	} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = url;
	} else {
		art.notice.show = 'Unsupported playback format: m3u8';
	}
}
