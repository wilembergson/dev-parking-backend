import { Hasher } from '@application/protocols/cryptografy';
import { User } from '@domain/entities';
import { UserFound } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories';
import { CreateUser } from '@domain/use-cases/user'

export class CreateUserUseCase implements CreateUser{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) { }

  async execute(input: CreateUser.Input): Promise<void> {
    const foundUser = await this.userRepository.findOne({ email: input.email });
    if (foundUser) throw new UserFound();
    const password = await this.hasher.hash(input.password)
    const user = new User({
      name: input.name,
      email: input.email,
      password,
      birthdate: input.birthdate,
    });
    await this.userRepository.save(user);
  }
}

