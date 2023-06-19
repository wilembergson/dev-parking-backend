import { EmployeeUser } from '@domain/entities';

export interface EmployeeUserRepository {
  findOne(input: EmployeeUserRepository.Input.FindOne): Promise<EmployeeUser | null>;

  save(user: EmployeeUser): Promise<void>;

  update(input: EmployeeUserRepository.Input.Update): Promise<void>;

  delete(input: EmployeeUserRepository.Input.Delete): Promise<void>;
}

export namespace EmployeeUserRepository {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      email: string;
      rg: string;
    }>;
    export type Update = {
      id: string;
      name: string;
      rg: string;
      email: string;
      password: string;
    };
    export type Delete = {
      id: string;
    };
  }
}
