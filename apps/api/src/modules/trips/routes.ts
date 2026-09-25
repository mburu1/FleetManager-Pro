// api/src/modules/trips/routes.ts
import { FastifyInstance } from 'fastify';
import { createTripSchema, updateTripStatusSchema, tripIdParams } from './schema';
import { TripService } from './service';

export default async function tripRoutes(fastify: FastifyInstance) {
  const tripService = new TripService(fastify);

  fastify.get('/', async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { page, limit } = request.query as any;
    const result = await tripService.listTrips(tenantId, Number(page) || 1, Number(limit) || 20);
    return reply.send(result);
  });

  fastify.post('/', { schema: createTripSchema }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { vehicleId, driverId, startLocation, endLocation, scheduledStartTime } = request.body as any;
    
    // Map flat body to Prisma relational structure
    const prismaData = {
      vehicle: { connect: { id: vehicleId } },
      driver: { connect: { id: driverId } },
      startLocation,
      endLocation,
      scheduledStartTime: scheduledStartTime ? new Date(scheduledStartTime) : new Date(),
    };

    try {
      const trip = await tripService.createTrip(tenantId, prismaData);
      return reply.status(201).send(trip);
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  });

  fastify.patch('/:id/status', { schema: updateTripStatusSchema }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { id } = request.params as any;
    const { status } = request.body as any;
    
    const result = await tripService.updateTripStatus(tenantId, id, status);
    if (result.count === 0) return reply.status(404).send({ error: 'Trip not found' });
    return reply.send({ message: 'Trip status updated' });
  });
}