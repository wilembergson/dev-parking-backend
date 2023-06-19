import { ID } from './id';

export class EmployeeUser {
  private readonly id: ID;
  private readonly name: string;
  private readonly rg: string;
  private readonly email: string;
  private readonly password: string;

  constructor(input: EmployeeUser.Input.constructor) {
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.rg = input.rg;
    this.id = new ID(input.id);
  }

  update(input: Partial<EmployeeUser.Output.GetState>): void {
    Object.keys(input).forEach((key) => {
      if (input[key] !== undefined && key !== 'id') {
        this[key] = input[key];
      }
    });
  }

  getState(): EmployeeUser.Output.GetState {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      rg: this.rg,
      id: this.id.value,
    };
  }

  getInformations(): EmployeeUser.Output.getInformations {
    return {
      id: this.id.value,
      name: this.name,
      rg: this.rg,
      email: this.email,
    };
  }
}

export namespace EmployeeUser {
  export namespace Output {
    export type GetState = {
      id: string;
      name: string;
      rg: string;
      email: string;
      password: string;
    };
    export type getInformations = {
      id: string;
      name: string;
      rg: string;
      email: string;
    };
  }
  export namespace Input {
    export type constructor = {
      id?: string;
      name: string;
      rg: string;
      email: string;
      password: string;
    };
  }
}
