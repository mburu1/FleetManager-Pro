// api/src/modules/auth/schema.ts
export const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
    },
  },
};

export const registerSchema = {
  body: {
    type: 'object',
    required: ['email', 'password', 'tenantName'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
      tenantName: { type: 'string', minLength: 3 },
    },
  },
};

export const refreshSchema = {
  body: {
    type: 'object',
    required: ['refreshToken'],
    properties: {
      refreshToken: { type: 'string' },
    },
  },
};