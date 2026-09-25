// api/src/modules/auth/routes.ts
import { FastifyInstance } from 'fastify';
import { loginSchema, registerSchema, refreshSchema } from './schema';
import { AuthService } from './service';

export default async function authRoutes(fastify: FastifyInstance) {
  const authService = new AuthService(fastify);

  fastify.post('/register', { schema: registerSchema }, async (request, reply) => {
    const { email, password, tenantName } = request.body as any;
    const result = await authService.register(email, password, tenantName);
    return reply.status(201).send({ message: 'Tenant and user created', userId: result.user.id });
  });

  fastify.post('/login', { schema: loginSchema }, async (request, reply) => {
    const { email, password } = request.body as any;
    const tokens = await authService.login(email, password);
    return reply.send(tokens);
  });

  fastify.post('/refresh', { schema: refreshSchema }, async (request, reply) => {
    try {
      const { refreshToken } = request.body as any;
      const payload = fastify.jwt.verify(refreshToken) as { userId: string };
      
      const user = await fastify.prisma.user.findUnique({ where: { id: payload.userId } });
      if (!user) throw new Error('User not found');

      const newToken = fastify.jwt.sign({ 
        userId: user.id, 
        tenantId: user.tenantId, 
        role: user.role 
      });
      
      return reply.send({ token: newToken });
    } catch (err) {
      return reply.status(401).send({ error: 'Invalid refresh token' });
    }
  });
}