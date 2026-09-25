// api/src/modules/drivers/routes.ts
import { FastifyInstance } from 'fastify';
import { createDriverSchema, driverIdParams } from './schema';
import { DriverService } from './service';

export default async function driverRoutes(fastify: FastifyInstance) {
  const driverService = new DriverService(fastify);

  fastify.get('/', async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { page, limit } = request.query as any;
    const result = await driverService.listDrivers(tenantId, Number(page) || 1, Number(limit) || 20);
    return reply.send(result);
  });

  fastify.get('/:id', { schema: driverIdParams }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { id } = request.params as any;
    const driver = await driverService.getDriverById(tenantId, id);
    if (!driver) return reply.status(404).send({ error: 'Driver not found' });
    return reply.send(driver);
  });

  fastify.post('/', { schema: createDriverSchema }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const driver = await driverService.createDriver(tenantId, request.body as any);
    return reply.status(201).send(driver);
  });

  fastify.patch('/:id', { schema: { ...driverIdParams, body: { type: 'object' } } }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { id } = request.params as any;
    const result = await driverService.updateDriver(tenantId, id, request.body as any);
    if (result.count === 0) return reply.status(404).send({ error: 'Driver not found' });
    return reply.send({ message: 'Driver updated' });
  });

  fastify.delete('/:id', { schema: driverIdParams }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { id } = request.params as any;
    const result = await driverService.deleteDriver(tenantId, id);
    if (result.count === 0) return reply.status(404).send({ error: 'Driver not found' });
    return reply.status(204).send();
  });
}