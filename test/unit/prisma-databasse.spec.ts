import { PrismaDatabase } from '@infra/database';

describe('Prisma-database', () => {
  it('should connect with database.', () => {
    const sut = new PrismaDatabase();
    expect(() => sut.getConnection()).not.toThrow();
  });
});
