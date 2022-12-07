import { UserNotFound } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories';

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: UpdateUser.Input): Promise<void> {
    const user = await this.userRepository.findOne({ email: input.email });
    if (!user) throw new UserNotFound();
    user.update(input);
    await this.userRepository.save(user);
  }
}

export namespace UpdateUser {
  export type Input = {
    id: string;
    name: string;
    email: string;
    age: number;
    password: string;
  };
}
