// api/src/middleware/tenant-isolation.ts
import { FastifyReply, FastifyRequest } from 'fastify';

export async function tenantIsolation(request: FastifyRequest, reply: FastifyReply) {
  // Ensure user is authenticated first
  if (!request.user) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  // Extract tenantId from JWT payload and attach to request context
  const tenantId = request.user.tenantId;
  
  if (!tenantId) {
    return reply.status(403).send({ error: 'Tenant context missing' });
  }

  // Decorate request with tenantId for downstream services
  (request as any).tenantId = tenantId;
}