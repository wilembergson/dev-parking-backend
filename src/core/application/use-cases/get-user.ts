import { User } from '@domain/entities';
import { UserNotFound } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories';

export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUser.Input.FindOne): Promise<User | null> {
    const user = await this.userRepository.findOne({ id: input.id });
    if (!user) throw new UserNotFound();

    return user;
  }
}

export namespace GetUser {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      email: string;
    }>;
  }
}
