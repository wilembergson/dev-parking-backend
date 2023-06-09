import { UserNotFound } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories';

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(id: string, input: UpdateUser.Input): Promise<void> {
    const user = await this.userRepository.findOne({ id });
    console.log(user);
    if (!user) throw new UserNotFound();
    user.update({ ...input, id });
    await this.userRepository.save(user);
  }
}

export namespace UpdateUser {
  export type Input = {
    name: string;
    email: string;
    age: number;
    password: string;
  };
}
