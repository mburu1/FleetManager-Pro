// api/src/plugins/auth.ts
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import { env } from '../config/env';

export default fp(async function authPlugin(fastify: FastifyInstance) {
  fastify.register(jwt, {
    secret: {
      private: env.JWT_SECRET,
      public: env.JWT_SECRET,
    },
    sign: { algorithm: 'HS256', expiresIn: '15m' },
  });

  fastify.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string; tenantId: string; role: string };
    user: { userId: string; tenantId: string; role: string };
  }
}