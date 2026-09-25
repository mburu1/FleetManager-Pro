// api/src/modules/tracking/routes.ts
import { FastifyInstance } from 'fastify';
import { ingestTelemetrySchema, queryTelemetrySchema } from './schema';
import { TrackingService } from './service';

export default async function trackingRoutes(fastify: FastifyInstance) {
  const trackingService = new TrackingService(fastify);

  // Note: In production, this endpoint should ideally use a lightweight device-auth 
  // (e.g., HMAC signature or API Key) rather than standard user JWTs.
  fastify.post('/ingest', { schema: ingestTelemetrySchema }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { vehicleId, points } = request.body as any;
    
    try {
      const result = await trackingService.ingestTelemetryBatch(tenantId, vehicleId, points);
      return reply.status(201).send(result);
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  });

  fastify.get('/history/:vehicleId', { schema: queryTelemetrySchema }, async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const { vehicleId } = request.params as any;
    const { startTime, endTime, limit } = request.query as any;

    const history = await trackingService.getTelemetryHistory(
      tenantId,
      vehicleId,
      startTime ? new Date(startTime) : undefined,
      endTime ? new Date(endTime) : undefined,
      Number(limit) || 100
    );

    return reply.send({ data: history });
  });
}