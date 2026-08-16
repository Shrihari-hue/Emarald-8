import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

export function createPrismaClient(
  connectionString = process.env['DATABASE_URL'],
) {
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
}

export type AppPrismaClient = ReturnType<typeof createPrismaClient>;
