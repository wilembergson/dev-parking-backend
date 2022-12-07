import { User } from '@domain/entities';

export interface UserRepository {
  findOne(input: UserRepository.Input.FindOne): Promise<User | null>;

  save(user: User): Promise<void>;
}

export namespace UserRepository {
  export namespace Input {
    export type FindOne = {
      email: string;
    };
  }
}
