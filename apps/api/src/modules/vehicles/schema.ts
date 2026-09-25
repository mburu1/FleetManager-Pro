// api/src/modules/vehicles/schema.ts
export const createVehicleSchema = {
  body: {
    type: 'object',
    required: ['vin', 'licensePlate', 'type'],
    properties: {
      vin: { type: 'string', minLength: 17, maxLength: 17 },
      licensePlate: { type: 'string' },
      type: { type: 'string', enum: ['TRUCK', 'VAN', 'CAR', 'MOTORCYCLE'] },
      make: { type: 'string' },
      model: { type: 'string' },
      year: { type: 'number', minimum: 1900, maximum: 2100 },
    },
  },
};

export const vehicleIdParams = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
};