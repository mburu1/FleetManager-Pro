// api/src/modules/auth/service.ts
import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';
import { Prisma } from '@prisma/client';

export class AuthService {
  constructor(private fastify: FastifyInstance) {}

  async register(email: string, password: string, tenantName: string) {
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create Tenant and Admin User in a transaction
    return this.fastify.prisma.$transaction(async (prisma) => {
      const tenant = await prisma.tenant.create({
        data: { name: tenantName, slug: tenantName.toLowerCase().replace(/\s+/g, '-') },
      });

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          tenantId: tenant.id,
          role: 'TENANT_ADMIN',
        },
      });

      return { user, tenant };
    });
  }

  async login(email: string, password: string) {
    const user = await this.fastify.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = this.fastify.jwt.sign({ 
      userId: user.id, 
      tenantId: user.tenantId, 
      role: user.role 
    });

    const refreshToken = this.fastify.jwt.sign(
      { userId: user.id },
      { expiresIn: '7d' }
    );

    return { token, refreshToken, user: { id: user.id, email: user.email, role: user.role } };
  }
}