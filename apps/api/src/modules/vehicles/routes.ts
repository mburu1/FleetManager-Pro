// api/src/modules/vehicles/routes.ts
import { FastifyInstance } from 'fastify';
import { createVehicleSchema, vehicleIdParams } from './schema';
import { VehicleService } from './service';

export default async function vehicleRoutes(fastify: FastifyInstance) {
  const vehicleService = new VehicleService(fastify);

  fastify.get('/', async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { page, limit } = request.query as any;
    const result = await vehicleService.listVehicles(tenantId, Number(page) || 1, Number(limit) || 20);
    return reply.send(result);
  });

  fastify.get('/:id', { schema: vehicleIdParams }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { id } = request.params as any;
    const vehicle = await vehicleService.getVehicleById(tenantId, id);
    if (!vehicle) return reply.status(404).send({ error: 'Vehicle not found' });
    return reply.send(vehicle);
  });

  fastify.post('/', { schema: createVehicleSchema }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const vehicle = await vehicleService.createVehicle(tenantId, request.body as any);
    return reply.status(201).send(vehicle);
  });

  fastify.patch('/:id', { schema: { ...vehicleIdParams, body: { type: 'object' } } }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { id } = request.params as any;
    const result = await vehicleService.updateVehicle(tenantId, id, request.body as any);
    if (result.count === 0) return reply.status(404).send({ error: 'Vehicle not found' });
    return reply.send({ message: 'Vehicle updated' });
  });

  fastify.delete('/:id', { schema: vehicleIdParams }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { id } = request.params as any;
    const result = await vehicleService.deleteVehicle(tenantId, id);
    if (result.count === 0) return reply.status(404).send({ error: 'Vehicle not found' });
    return reply.status(204).send();
  });
}