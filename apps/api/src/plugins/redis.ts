// api/src/plugins/redis.ts
import fp from 'fastify-plugin';
import Redis from 'ioredis';
import { FastifyInstance } from 'fastify';
import { env } from '../config/env';

export default fp(async function redisPlugin(fastify: FastifyInstance) {
  const redis = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
  });

  fastify.decorate('redis', redis);

  fastify.addHook('onClose', async (instance) => {
    await instance.redis.quit();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis;
  }
}