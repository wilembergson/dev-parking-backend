import { User } from '@domain/entities';
import { UserNotFound } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories';

export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUser.Input.FindOne): Promise<User | null> {
    let foundUser;
    try {
      foundUser = await this.userRepository.findOne({ email: input.email });
      if (!foundUser) throw new UserNotFound();
    } catch (error) {
      console.log(error);
    }
    return foundUser;
  }
}

export namespace GetUser {
  export namespace Input {
    export type FindOne = {
      email: string;
    };
  }
}
