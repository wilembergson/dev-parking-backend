import { UserNotFound } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories';

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: DeleteUser.Input.FindOne): Promise<void> {
    try {
      const foundUser = await this.userRepository.findOne({
        email: input.email,
      });
      if (!foundUser) throw new UserNotFound();
      await this.userRepository.delete({ id: foundUser.getState().id });
    } catch (error) {
      console.log(error);
    }
  }
}

export namespace DeleteUser {
  export namespace Input {
    export type FindOne = {
      email: string;
    };
  }
}
