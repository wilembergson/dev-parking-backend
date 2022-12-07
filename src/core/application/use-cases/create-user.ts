import { User } from '@domain/entities';
import { UserFound } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUser.Input): Promise<void> {
    const foundUser = await this.userRepository.findOne({ email: input.email });
    if (foundUser) throw new UserFound();
    const user = new User({
      name: input.name,
      email: input.email,
      password: input.password,
      age: input.age,
    });
    await this.userRepository.save(user);
  }
}

export namespace CreateUser {
  export type Input = {
    name: string;
    email: string;
    age: number;
    password: string;
  };
}
