import { EmployeeUser } from '@domain/entities';
import { faker } from '@faker-js/faker';
import { UserRepository } from '@domain/repositories';
import { PrismaDatabase } from '@infra/database';
import { EmployeeUserRepositoryPrisma } from '@infra/repositories';

describe('User-Repository-Prisma', () => {
  let sut: UserRepository;
  let database: PrismaDatabase;
  beforeAll(() => {
    database = new PrismaDatabase();
    sut = new EmployeeUserRepositoryPrisma(database);
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

  it('should delete a user.', async () => {
    const user = newUser();
    await sut.save(user);
    await expect(sut.delete({ id: user.getState().id })).resolves.not.toThrow();
  });

  it('should update a user.', async () => {
    const id = faker.datatype.uuid();
    await sut.save(
      new EmployeeUser({
        id,
        name: faker.datatype.string(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.datatype.number(),
      }),
    );
    await expect(
      sut.update({
        id,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.datatype.number(),
      }),
    ).resolves.not.toThrow();
  });
});

export function newUser(input?: { email?: string }) {
  return new EmployeeUser({
    name: faker.datatype.string(),
    email: input?.email ?? faker.internet.email(),
    password: faker.internet.password(),
    age: faker.datatype.number(),
  });
}

export function newRepository() {
  return new EmployeeUserRepositoryPrisma(PrismaDatabase.getInstance());
}
