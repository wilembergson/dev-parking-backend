import { DeleteUser } from '@application/use-cases/delete-user';
import { EmployeeUser } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { EmployeeUserRepositoryPrisma } from '@infra/repositories';

describe('DeleteUser', () => {
  let sut: DeleteUser;
  let userRepository: UserRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    userRepository = new EmployeeUserRepositoryPrisma(database);
    sut = new DeleteUser(userRepository);
  });

  it('should delete a user.', async () => {
    const user = new EmployeeUser({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      age: faker.datatype.number(),
    });
    await userRepository.save(user);
    await expect(
      sut.execute({ id: user.getState().id }),
    ).resolves.not.toThrow();
  });

  it('should throw when try to delete a user.', async () => {
    const user = new EmployeeUser({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      age: faker.datatype.number(),
    });
    await expect(sut.execute({ id: user.getState().id })).rejects.toThrow();
  });
});
