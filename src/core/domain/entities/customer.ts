import { ID } from './id';

export class Customer {
  private readonly id: ID;
  private readonly name: string;
  private readonly rg: string;

  constructor(input: Customer.Input.constructor) {
    this.name = input.name;
    this.rg = input.rg;
    this.id = new ID(input.id);
  }

  getState(): Customer.Output.GetState {
    return {
      name: this.name,
      rg: this.rg,
      id: this.id.value,
    };
  }

  update(input: Partial<Customer.Output.GetState>): void {
    Object.keys(input).forEach((key) => {
      if (input[key] !== undefined && key !== 'id') {
        this[key] = input[key];
      }
    });
  }
}

export namespace Customer {
  export namespace Input {
    export type constructor = {
      name: string;
      rg: string;
      id?: string;
    };
  }
  export namespace Output {
    export type GetState = {
      name: string;
      rg: string;
      id: string;
    };
  }
}
