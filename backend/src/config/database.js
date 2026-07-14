import { PrismaClient } from '@prisma/client';
import env, { isDummyMode } from './env.js';

const globalForPrisma = globalThis;

let prisma = null;

if (!isDummyMode()) {
  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: env.nodeEnv === 'development' ? ['error', 'warn'] : ['error'],
    });

  if (env.nodeEnv !== 'production') {
    globalForPrisma.prisma = prisma;
  }
}

export default prisma;

export const getPrisma = () => {
  if (!prisma) {
    throw new Error('Database is not configured. Set DATABASE_URL in .env to use PostgreSQL.');
  }
  return prisma;
};
