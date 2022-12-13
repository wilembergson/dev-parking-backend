import { User } from '@domain/entities';

export interface UserRepository {
  findOne(input: UserRepository.Input.FindOne): Promise<User | null>;

  save(user: User): Promise<void>;

  update(input: UserRepository.Input.Update): Promise<void>;

  delete(input: UserRepository.Input.Delete): Promise<void>;
}

export namespace UserRepository {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      email: string;
    }>;
    export type Update = {
      id: string;
      name: string;
      email: string;
      age: number;
      password: string;
    };
    export type Delete = {
      id: string;
    };
  }
}
