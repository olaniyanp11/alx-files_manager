import { createClient } from 'redis';

import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.__client = createClient();
    this.__client.on('error', (error) => {
      console.log(error);
    });
  }

  isAlive() {
    return this.__client.connected;
  }

  async get(key) {
    const getAsync = promisify(this.__client.get).bind(this.__client);
    const res = await getAsync(key);
    return res;
  }

  async set(key, value, duration) {
    const setAsync = promisify(this.__client.set).bind(this.__client);
    const res = await setAsync(key, value, 'EX', duration);
    return res;
  }

  async del(key) {
    const delAsync = promisify(this.__client.del).bind(this.__client);
    const res = await delAsync(key);
    return res;
  }
}

const redisClient = new RedisClient();
export default redisClient;
