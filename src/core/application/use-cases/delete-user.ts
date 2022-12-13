import { UserNotFound } from '@domain/exceptions';
import { UserRepository } from '@domain/repositories';

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: DeleteUser.Input.FindOne): Promise<void> {
    const user = await this.userRepository.findOne({
      id: input.id,
    });
    if (!user) throw new UserNotFound();
    await this.userRepository.delete({ id: user.getState().id });
  }
}

export namespace DeleteUser {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      email: string;
    }>;
  }
}
