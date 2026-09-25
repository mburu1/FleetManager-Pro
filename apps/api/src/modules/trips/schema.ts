// api/src/modules/trips/schema.ts
export const createTripSchema = {
  body: {
    type: 'object',
    required: ['vehicleId', 'driverId', 'startLocation', 'endLocation'],
    properties: {
      vehicleId: { type: 'string', format: 'uuid' },
      driverId: { type: 'string', format: 'uuid' },
      startLocation: { type: 'string', minLength: 3 },
      endLocation: { type: 'string', minLength: 3 },
      scheduledStartTime: { type: 'string', format: 'date-time' },
    },
  },
};

export const updateTripStatusSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string', format: 'uuid' } },
  },
  body: {
    type: 'object',
    required: ['status'],
    properties: {
      status: { type: 'string', enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] },
    },
  },
};

export const tripIdParams = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string', format: 'uuid' } },
  },
};