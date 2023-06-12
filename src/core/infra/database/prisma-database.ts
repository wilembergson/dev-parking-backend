import { PrismaClient } from '@prisma/client';
import { Database } from './database';

export class PrismaDatabase implements Database<PrismaClient> {
  private client: PrismaClient;
  //private static instance: PrismaDatabase;

  constructor() {
    this.client = new PrismaClient();
  }
  getConnection() {
    return this.client;
  }
  /*static getInstance(): PrismaDatabase {
    if (!this.instance) {
      this.instance = new PrismaDatabase();
    }
    return this.instance;
  }*/
}
