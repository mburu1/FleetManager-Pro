// api/src/modules/tracking/schema.ts
export const ingestTelemetrySchema = {
  body: {
    type: 'object',
    required: ['vehicleId', 'points'],
    properties: {
      vehicleId: { type: 'string', format: 'uuid' },
      points: {
        type: 'array',
        minItems: 1,
        maxItems: 100, // Prevent payload abuse
        items: {
          type: 'object',
          required: ['latitude', 'longitude', 'timestamp'],
          properties: {
            latitude: { type: 'number', minimum: -90, maximum: 90 },
            longitude: { type: 'number', minimum: -180, maximum: 180 },
            speed: { type: 'number', minimum: 0 },
            heading: { type: 'number', minimum: 0, maximum: 360 },
            timestamp: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
};

export const queryTelemetrySchema = {
  params: {
    type: 'object',
    required: ['vehicleId'],
    properties: { vehicleId: { type: 'string', format: 'uuid' } },
  },
  querystring: {
    type: 'object',
    properties: {
      startTime: { type: 'string', format: 'date-time' },
      endTime: { type: 'string', format: 'date-time' },
      limit: { type: 'number', maximum: 1000, default: 100 },
    },
  },
};