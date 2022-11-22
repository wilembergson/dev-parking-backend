import { PrismaClient } from '@prisma/client';
import { Database } from './database';

export class PrismaDatabase implements Database<PrismaClient> {
  getConnection(): PrismaClient {
    return new PrismaClient();
  }
}
