import { ID } from './id';

export class User {
  private readonly id: ID;
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;
  private readonly birthdate: string;

  constructor(input: User.Input.constructor) {
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.birthdate = input.birthdate;
    this.id = new ID(input.id);
  }

  update(input: Partial<User.Output.GetState>): void {
    Object.keys(input).forEach((key) => {
      if (input[key] !== undefined && key !== 'id') {
        this[key] = input[key];
      }
    });
  }

  getState(): User.Output.GetState {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      birthdate: this.birthdate,
      id: this.id.value,
    };
  }
}

export namespace User {
  export namespace Output {
    export type GetState = {
      name: string;
      email: string;
      password: string;
      birthdate: string;
      id: string;
    };
  }
  export namespace Input {
    export type constructor = {
      name: string;
      email: string;
      password: string;
      birthdate: string;
      id?: string;
    };
  }
}
