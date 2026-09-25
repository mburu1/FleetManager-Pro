// api/src/plugins/prisma.ts
import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

export default fp(async function prismaPlugin(fastify: FastifyInstance) {
  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

  await prisma.$connect();

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect();
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}