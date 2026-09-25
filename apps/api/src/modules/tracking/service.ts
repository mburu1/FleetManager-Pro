// api/src/modules/tracking/service.ts
import { FastifyInstance } from 'fastify';
import { Prisma } from '@prisma/client';

export class TrackingService {
  constructor(private fastify: FastifyInstance) {}

  async ingestTelemetryBatch(tenantId: string, vehicleId: string, points: any[]) {
    // 1. Verify vehicle belongs to tenant
    const vehicle = await this.fastify.prisma.vehicle.findFirst({
      where: { id: vehicleId, tenantId },
    });
    if (!vehicle) throw new Error('Vehicle not found or access denied');

    // 2. Map points to Prisma createMany format
    const dataToInsert: Prisma.TelemetryPointCreateManyInput[] = points.map(p => ({
      vehicleId,
      tenantId,
      latitude: p.latitude,
      longitude: p.longitude,
      speed: p.speed || 0,
      heading: p.heading || 0,
      timestamp: new Date(p.timestamp),
    }));

    // 3. Batch insert for performance
    const result = await this.fastify.prisma.telemetryPoint.createMany({
      data: dataToInsert,
      skipDuplicates: true,
    });

    return { insertedCount: result.count };
  }

  async getTelemetryHistory(tenantId: string, vehicleId: string, startTime?: Date, endTime?: Date, limit = 100) {
    // Verify vehicle belongs to tenant
    const vehicle = await this.fastify.prisma.vehicle.findFirst({
      where: { id: vehicleId, tenantId },
    });
    if (!vehicle) throw new Error('Vehicle not found or access denied');

    const whereClause: Prisma.TelemetryPointWhereInput = {
      vehicleId,
      tenantId,
    };

    if (startTime || endTime) {
      whereClause.timestamp = {};
      if (startTime) whereClause.timestamp.gte = startTime;
      if (endTime) whereClause.timestamp.lte = endTime;
    }

    return this.fastify.prisma.telemetryPoint.findMany({
      where: whereClause,
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
  }
}