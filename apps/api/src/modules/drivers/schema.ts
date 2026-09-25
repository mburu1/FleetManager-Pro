// api/src/modules/drivers/schema.ts
export const createDriverSchema = {
  body: {
    type: 'object',
    required: ['name', 'licenseNumber'],
    properties: {
      name: { type: 'string', minLength: 2 },
      licenseNumber: { type: 'string', minLength: 5 },
      phone: { type: 'string' },
      email: { type: 'string', format: 'email' },
      status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'], default: 'ACTIVE' },
    },
  },
};

export const driverIdParams = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
};