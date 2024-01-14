<script lang="ts">
	import Artplayer from 'artplayer';
	import ioClient from 'socket.io-client';
	import { onMount } from 'svelte';
	const ENDPOINT = 'http://localhost:3000';
	export let data;
	interface data {
		user: string;
		room: number;
		currentTime?: number;
	}
	onMount(async () => {
		var art = new Artplayer({
			container: '.artplayer-app',
			url: 'https://www.artplayer.org/assets/sample/video.mp4'
		});

		// Connect to the server
		const socket = ioClient(ENDPOINT);

		// Send JOIN_ROOM event with the data
		const joinRoomData = {
			user: data.user,
			room: data.id
		};

		socket.emit('JOIN_ROOM', joinRoomData);

		// Flag to track play state

		// Listen to the ROOM_JOINED and PLAY events
		socket.on('ROOM_JOINED', (data) => {
			console.log('Room joined:', data);
		});

		socket.on('PLAY', (data) => {
			console.log('Play event:', data);
			if (data.user != joinRoomData.user) {
				art.play();
			}
		});

		socket.on('PAUSE', (data) => {
			console.log('Pause event:', data);
			if (data.user != joinRoomData.user) {
				art.pause();
			}
		});

		socket.on('SYNC_TIME', (data) => {
			if (data.user != joinRoomData.user) {
				console.log('Sync event:', data.currentTime);
				art.currentTime = data.currentTime;
			}
		});

		art.on('seek', (data) => {
			const syncData = {
				currentTime: art.currentTime,
				room: joinRoomData.room,
				user: joinRoomData.user
			};
			console.log('Seek event:', data);
			socket.emit('SYNC_TIME', syncData);
		});

		art.on('video:play', () => {
			socket.emit('PLAY', joinRoomData); // Emit the PLAY event
		});
		art.on('video:pause', () => {
			socket.emit('PAUSE', joinRoomData); // Emit the PLAY event
		});
	});
</script>

<div>
	<div class="artplayer-app h-96 aspect-video" />
</div>
