import { User } from '@domain/entities';

export interface UserRepository {
  findOne(input: UserRepositoryDTO.Input.FindOne): Promise<User | null>;

  save(user: User): Promise<void>;

  update(input: UserRepositoryDTO.Input.Update): Promise<void>;

  delete(input: UserRepositoryDTO.Input.Delete): Promise<void>;
}

export namespace UserRepositoryDTO {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      email: string;
    }>;
    export type Update = {
      id: string;
      name: string;
      email: string;
      birthdate: string;
      password: string;
    };
    export type Delete = {
      id: string;
    };
  }
}
