// api/src/modules/trips/service.ts
import { FastifyInstance } from 'fastify';
import { Prisma, TripStatus } from '@prisma/client';

export class TripService {
  constructor(private fastify: FastifyInstance) {}

  async listTrips(tenantId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const [trips, total] = await Promise.all([
      this.fastify.prisma.trip.findMany({
        where: { tenantId },
        include: { vehicle: { select: { licensePlate: true } }, driver: { select: { name: true } } },
        skip,
        take: limit,
        orderBy: { scheduledStartTime: 'desc' },
      }),
      this.fastify.prisma.trip.count({ where: { tenantId } }),
    ]);

    return { data: trips, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async createTrip(tenantId: string, data: Prisma.TripCreateInput) {
    // Validate that Vehicle and Driver belong to the same tenant
    const [vehicle, driver] = await Promise.all([
      this.fastify.prisma.vehicle.findFirst({ where: { id: data.vehicleId.connect?.id, tenantId } }),
      this.fastify.prisma.driver.findFirst({ where: { id: data.driverId.connect?.id, tenantId } }),
    ]);

    if (!vehicle) throw new Error('Vehicle not found or access denied');
    if (!driver) throw new Error('Driver not found or access denied');

    return this.fastify.prisma.trip.create({
      data: {
        ...data,
        tenantId,
        status: 'SCHEDULED',
      },
    });
  }

  async updateTripStatus(tenantId: string, tripId: string, status: TripStatus) {
    const updateData: any = { status };
    
    // Auto-capture timestamps for specific state transitions
    if (status === 'IN_PROGRESS') updateData.actualStartTime = new Date();
    if (status === 'COMPLETED' || status === 'CANCELLED') updateData.actualEndTime = new Date();

    return this.fastify.prisma.trip.updateMany({
      where: { id: tripId, tenantId },
      data: updateData,
    });
  }
}