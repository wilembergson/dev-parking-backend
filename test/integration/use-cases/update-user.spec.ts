import { UpdateUser } from '@application/use-cases';
import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateUser', () => {
  let sut: UpdateUser;
  let userRepository: MockProxy<UserRepository>;

  beforeAll(() => {
    userRepository = mock();
    sut = new UpdateUser(userRepository);
  });

  it('should create a new user.', async () => {
    userRepository.findOne.mockResolvedValueOnce(null);
    await expect(
      sut.execute({
        id: 'jkjkjkj',
        name: 'valor',
        email: 'valor',
        password: 'valor',
        age: 88,
      }),
    ).rejects.toThrow();
  });

  it('should .', async () => {
    const user = new User({
      name: 'valor',
      email: 'valor',
      password: 'valor',
      age: 88,
    });
    userRepository.findOne.mockResolvedValueOnce(user);
    const updateData = {
      id: user.getState().id,
      name: 'valor2',
      email: 'valor2',
      password: 'valor2',
      age: 38,
    };
    expect(sut.execute(updateData)).resolves.not.toThrow();
  });
});
