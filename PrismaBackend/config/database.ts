import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

prisma.$on('query', (e) => {
  logger.debug(`Query: ${e.query} Params: ${e.params} Duration: ${e.duration}ms`);
});

export default prisma;