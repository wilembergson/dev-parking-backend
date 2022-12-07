import { ID } from './id';

export class Car {
  private readonly id: ID;
  private readonly name: string;
  private readonly brand: string;
  private readonly plate: string;

  constructor(input: Car.Input.constructor) {
    this.name = input.name;
    this.brand = input.brand;
    this.plate = input.plate;
    this.id = new ID(input.id);
  }

  getState(): Car.Output.GetState {
    return {
      name: this.name,
      brand: this.brand,
      plate: this.plate,
      id: this.id.value,
    };
  }

  update(input: Partial<Car.Output.GetState>): void {
    Object.keys(input).forEach((key) => {
      if (input[key] !== undefined && key !== 'id') {
        this[key] = input[key];
      }
    });
  }
}

export namespace Car {
  export namespace Input {
    export type constructor = {
      name: string;
      brand: string;
      plate: string;
      id?: string;
    };
  }
  export namespace Output {
    export type GetState = {
      name: string;
      brand: string;
      plate: string;
      id: string;
    };
  }
}
