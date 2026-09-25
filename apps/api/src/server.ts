// api/src/server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';

// Plugins
import prismaPlugin from './plugins/prisma';
import redisPlugin from './plugins/redis';
import authPlugin from './plugins/auth';

// Routes
import authRoutes from './modules/auth/routes';
import tenantRoutes from './modules/tenants/routes';
import vehicleRoutes from './modules/vehicles/routes';

export async function buildServer() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'development' ? 'debug' : 'info',
      transport: env.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined,
    },
  });

  // Global Middleware
  await app.register(helmet, { contentSecurityPolicy: false });
  await app.register(cors, { origin: env.CORS_ORIGIN, credentials: true });
  await app.register(rateLimit, { max: 100, timeWindow: '1 minute' });

  // Core Plugins
  await app.register(prismaPlugin);
  await app.register(redisPlugin);
  await app.register(authPlugin);

  // Global Error Handler
  app.setErrorHandler(errorHandler);

  // Health Check
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  // Module Routes
  app.register(authRoutes, { prefix: '/api/auth' });
  
  // Protected Routes (Require Auth + Tenant Isolation)
  app.register(async (protectedApp) => {
    protectedApp.addHook('onRequest', app.authenticate);
    protectedApp.addHook('onRequest', async (request, reply) => {
      // Import dynamically or reference directly if extracted
      const { tenantIsolation } = await import('./middleware/tenant-isolation');
      return tenantIsolation(request, reply);
    });

    protectedApp.register(tenantRoutes, { prefix: '/api/tenants' });
    protectedApp.register(vehicleRoutes, { prefix: '/api/vehicles' });
    // Future: drivers, trips, tracking, etc.
  }, { prefix: '/api' });

  return app;
}

async function start() {
  const app = await buildServer();
  try {
    await app.listen({ port: env.PORT, host: env.HOST });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Start server if run directly
if (require.main === module) {
  start();
}