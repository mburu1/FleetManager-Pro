// api/src/modules/vehicles/service.ts
import { FastifyInstance } from 'fastify';
import { Prisma } from '@prisma/client';

export class VehicleService {
  constructor(private fastify: FastifyInstance) {}

  async listVehicles(tenantId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const [vehicles, total] = await Promise.all([
      this.fastify.prisma.vehicle.findMany({
        where: { tenantId }, // STRICT TENANT ISOLATION
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.fastify.prisma.vehicle.count({ where: { tenantId } }),
    ]);

    return {
      data: vehicles,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getVehicleById(tenantId: string, vehicleId: string) {
    return this.fastify.prisma.vehicle.findFirst({
      where: { id: vehicleId, tenantId }, // STRICT TENANT ISOLATION
    });
  }

  async createVehicle(tenantId: string, data: Prisma.VehicleCreateInput) {
    return this.fastify.prisma.vehicle.create({
      data: {
        ...data,
        tenantId, // Inject tenant context
        status: 'ACTIVE',
      },
    });
  }

  async updateVehicle(tenantId: string, vehicleId: string, data: Prisma.VehicleUpdateInput) {
    return this.fastify.prisma.vehicle.updateMany({
      where: { id: vehicleId, tenantId }, // STRICT TENANT ISOLATION
      data,
    });
  }

  async deleteVehicle(tenantId: string, vehicleId: string) {
    return this.fastify.prisma.vehicle.deleteMany({
      where: { id: vehicleId, tenantId }, // STRICT TENANT ISOLATION
    });
  }
}