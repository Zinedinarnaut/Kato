import { Redis } from 'ioredis';
import { REDIS_URI } from '$env/static/private';

export const redis = new Redis(REDIS_URI);

redis.on('ready', () => {
	console.log('Redis is ready');
});

redis.on('error', () => {
	console.log('Redis has failed');
});
