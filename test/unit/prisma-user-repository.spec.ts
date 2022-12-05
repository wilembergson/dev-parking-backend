import { PrismaUserRepository } from '@infra/repositories';
import { PrismaDatabase } from '@infra/database';
import { User } from '@domain/entities';
import { faker } from '@faker-js/faker';
import { UserRepository } from '@domain/repositories';

describe('Prisma-User-Repository', () => {
  let sut: UserRepository;
  let database: PrismaDatabase;
  beforeAll(() => {
    database = new PrismaDatabase();
    sut = new PrismaUserRepository(database);
  });
  it('save a new user.', async () => {
    const user = newUser();
    expect(sut.save(user)).resolves.not.toThrow();
  });
  it('find a repository.', async () => {
    const email = faker.internet.email();
    await sut.save(newUser({ email }));
    const user = await sut.findOne({ email });
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('age');
  });
  it('should throw to find a repository.', async () => {
    const user = await sut.findOne({ email: faker.internet.email() });

    expect(user).toBeNull();
  });
});

export function newUser(input?: { email?: string }) {
  return new User({
    name: faker.datatype.string(),
    email: input?.email ?? faker.internet.email(),
    password: faker.internet.password(),
    age: faker.datatype.number(),
  });
}

export function newRepository() {
  return new PrismaUserRepository(new PrismaDatabase());
}
