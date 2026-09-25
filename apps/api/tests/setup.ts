// api/tests/setup.ts
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Create a unique test database schema or URL
  const testDbUrl = process.env.DATABASE_URL?.replace(/\/[^/]+$/, `/test_${randomUUID()}`);
  process.env.DATABASE_URL = testDbUrl;

  // Run migrations on the test DB
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
});

afterAll(async () => {
  // Cleanup test database
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;`);
  await prisma.$disconnect();
});