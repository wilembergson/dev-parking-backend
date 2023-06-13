import { EmployeeUser } from "@domain/entities";

export interface GetUser{
    execute(input: GetUser.Input.FindOne): Promise<EmployeeUser>
}

export namespace GetUser {
    export namespace Input {
      export type FindOne = Partial<{
        id: string;
        email: string;
      }>;
    }
  }
  