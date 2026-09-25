// api/src/modules/tenants/schema.ts
export const updateTenantSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 3 },
      settings: { type: 'object' },
    },
  },
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
};