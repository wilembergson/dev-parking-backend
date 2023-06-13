import { CreateUser } from '@application/use-cases';
import { EmployeeUser } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateUser', () => {
  let sut: CreateUser;
  let userRepository: MockProxy<UserRepository>;

  beforeAll(() => {
    userRepository = mock();
    sut = new CreateUser(userRepository);
  });

  it('should throws error if user already exists.', async () => {
    userRepository.findOne.mockResolvedValueOnce(
      new EmployeeUser({ name: 'valor', email: 'valor', password: 'valor', age: 88 }),
    );
    await expect(
      sut.execute({ name: 'vv', email: 'vv', password: 'vv', age: 44 }),
    ).rejects.toThrow();
  });

  it('should create a new user.', async () => {
    userRepository.findOne.mockResolvedValueOnce(null);
    await expect(
      sut.execute({ name: 'vv', email: 'vv', password: 'vv', age: 44 }),
    ).resolves.not.toThrow();
  });
});
