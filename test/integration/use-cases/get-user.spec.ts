import { GetUser } from '@application/use-cases/get-user';
import { User, Vacancy } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { faker } from '@faker-js/faker';
import { Database, PrismaDatabase } from '@infra/database';
import { UserRepositoryPrisma } from '@infra/repositories';

describe('GetUser', () => {
  let sut: GetUser;
  let userRepository: UserRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    userRepository = new UserRepositoryPrisma(database);
    sut = new GetUser(userRepository);
  });

  it('should find a user.', async () => {
    const user = new User({
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
