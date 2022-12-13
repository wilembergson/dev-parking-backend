import { UpdateUser } from '@application/use-cases';
import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { UserRepositoryPrisma } from '@infra/repositories';

describe('UpdateUser', () => {
  let sut: UpdateUser;
  let userRepository: UserRepository;
  let database: Database;

  beforeAll(() => {
    database = new PrismaDatabase();
    userRepository = new UserRepositoryPrisma(database);
    sut = new UpdateUser(userRepository);
  });

  it('should throw when create a new user.', async () => {
    await expect(
      sut.execute('jkjkjkj', {
        name: 'valor',
        email: 'valor',
        password: 'valor',
        age: 88,
      }),
    ).rejects.toThrow();
  });

  /*it('should update a user.', async () => {
    const user = new User({
      name: 'valor',
      email: 'valor',
      password: 'valor',
      age: 88,
    });
    await userRepository.save(user);
    const updateData = {
      name: 'valor2',
      email: 'valor2',
      password: 'valor2',
      age: 38,
    };
    expect(sut.execute(user.getState().id, updateData)).resolves.not.toThrow();
  });*/
});
