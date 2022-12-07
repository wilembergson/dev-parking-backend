import { PrismaClient } from '@prisma/client';
import { Database } from './database';

export class PrismaDatabase implements Database<PrismaClient> {
  private static instance: PrismaDatabase | null;
  private client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }
  getConnection(): PrismaClient {
    return this.client;
  }
  static getInstance(): PrismaDatabase {
    if (!this.instance) {
      this.instance = new PrismaDatabase();
    }
    return this.instance;
  }
}
