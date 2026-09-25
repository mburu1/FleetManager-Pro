// api/src/modules/tenants/service.ts
import { FastifyInstance } from 'fastify';

export class TenantService {
  constructor(private fastify: FastifyInstance) {}

  async getCurrentTenant(tenantId: string) {
    return this.fastify.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { users: { select: { id: true, email: true, role: true } } },
    });
  }

  async updateTenant(tenantId: string, data: { name?: string; settings?: any }) {
    return this.fastify.prisma.tenant.update({
      where: { id: tenantId },
      data,
    });
  }
}