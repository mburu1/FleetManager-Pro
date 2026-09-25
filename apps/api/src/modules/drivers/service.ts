// api/src/modules/drivers/service.ts
import { FastifyInstance } from 'fastify';
import { Prisma } from '@prisma/client';

export class DriverService {
  constructor(private fastify: FastifyInstance) {}

  async listDrivers(tenantId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const [drivers, total] = await Promise.all([
      this.fastify.prisma.driver.findMany({
        where: { tenantId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.fastify.prisma.driver.count({ where: { tenantId } }),
    ]);

    return {
      data: drivers,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getDriverById(tenantId: string, driverId: string) {
    return this.fastify.prisma.driver.findFirst({
      where: { id: driverId, tenantId },
    });
  }

  async createDriver(tenantId: string, data: Prisma.DriverCreateInput) {
    return this.fastify.prisma.driver.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  async updateDriver(tenantId: string, driverId: string, data: Prisma.DriverUpdateInput) {
    return this.fastify.prisma.driver.updateMany({
      where: { id: driverId, tenantId },
      data,
    });
  }

  async deleteDriver(tenantId: string, driverId: string) {
    return this.fastify.prisma.driver.deleteMany({
      where: { id: driverId, tenantId },
    });
  }
}