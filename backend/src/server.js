import app from './app.js';
import env, { validateEnv, isDummyMode } from './config/env.js';
import prisma from './config/database.js';

validateEnv();

const server = app.listen(env.port, () => {
  if (isDummyMode()) {
    console.log('⚠️  Running in DUMMY MODE (no database)');
    console.log(`   Admin login: ${env.admin.email} / ${env.admin.password}`);
  }
  console.log(`KN Store API running on port ${env.port} (${env.nodeEnv})`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    if (prisma) {
      await prisma.$disconnect();
    }
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});
