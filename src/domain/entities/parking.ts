import { ID } from './id';

export class Parking {
  private readonly id: ID;
  private readonly localization: string;
  private readonly vacancies: number;

  constructor(input: Parking.Input.constructor) {
    this.localization = input.localization;
    this.vacancies = input.vacancies;
    this.id = new ID(input.id);
  }

  getState(): Parking.Output.GetState {
    return {
      localization: this.localization,
      vacancies: this.vacancies,
      id: this.id.value,
    };
  }

  update(input: Partial<Parking.Output.GetState>): void {
    Object.keys(input).forEach((key) => {
      if (input[key] !== undefined && key !== 'id') {
        this[key] = input[key];
      }
    });
  }
}

export namespace Parking {
  export namespace Input {
    export type constructor = {
      localization: string;
      vacancies: number;
      id?: string;
    };
  }
  export namespace Output {
    export type GetState = {
      localization: string;
      vacancies: number;
      id: string;
    };
  }
}
