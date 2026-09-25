// api/src/modules/tenants/routes.ts
import { FastifyInstance } from 'fastify';
import { updateTenantSchema } from './schema';
import { TenantService } from './service';

export default async function tenantRoutes(fastify: FastifyInstance) {
  const tenantService = new TenantService(fastify);

  fastify.get('/me', async (request, reply) => {
    const tenantId = (request as any).tenantId;
    const tenant = await tenantService.getCurrentTenant(tenantId);
    if (!tenant) return reply.status(404).send({ error: 'Tenant not found' });
    return reply.send(tenant);
  });

  fastify.patch('/:id', { schema: updateTenantSchema }, async (request, reply) => {
    const { id } = request.params as any;
    const tenantId = (request as any).tenantId;
    
    // Ensure tenant can only update themselves (unless Platform Admin)
    if (id !== tenantId && request.user.role !== 'PLATFORM_ADMIN') {
      return reply.status(403).send({ error: 'Forbidden' });
    }

    const updated = await tenantService.updateTenant(id, request.body as any);
    return reply.send(updated);
  });
}