import { EmployeeGetUser } from '@application/use-cases/get-employee-user';
import { EmployeeUser, Vacancy } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { EmployeeUserRepositoryPrisma } from '@infra/repositories';

describe('GetUser', () => {
  let sut: EmployeeGetUser;
  let userRepository: UserRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    userRepository = new EmployeeUserRepositoryPrisma(database);
    sut = new EmployeeGetUser(userRepository);
  });

  it('should find a user.', async () => {
    const user = new EmployeeUser({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      age: faker.datatype.number(),
    });
    await userRepository.save(user);
    await expect(
      sut.execute({ id: user.getState().id }),
    ).resolves.not.toBeNull();
  });

  it('should throw error if a user dont exists.', async () => {
    const user = new Vacancy({ localization: faker.datatype.string() });
    await expect(sut.execute({ id: user.getState().id })).rejects.toThrow();
  });
});
