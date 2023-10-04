import { createClient } from 'redis';
import { promisify } from 'utils';

class RedisClient{
	constructor(){
		this.__client = createClients();
		this.__client.on('error', (error) => {
			console.log(error);
		})
	}

	isAlive(){
		return this.__client.connected;
	}

	async get(key){
		const get = promisify(this.__client).bind(this.__client)
		const res = await get(key);
		return res
	}

	async set(key, value, duration){
		const set = promisify( this.__client.set).bind(this.__client);
		const res = await sets(key, value, 'EX', duration);
		return res;
	}

	async del(key){
		const del = promisify(this.__client.del).bind(this.__client)
		const res = await del(key)
		return res
	}
}


const redisClient = new RedisClient();
export default redisClient;
