import { ID } from './id';

export class Vacancy {
  private readonly id: ID;
  private readonly localization: string;

  constructor(input: Vacancy.Input.constructor) {
    this.localization = input.localization;
    this.id = new ID(input.id);
  }

  getState(): Vacancy.Output.GetState {
    return {
      localization: this.localization,
      id: this.id.value,
    };
  }

  update(input: Partial<Vacancy.Output.GetState>): void {
    Object.keys(input).forEach((key) => {
      if (input[key] !== undefined && key !== 'id') {
        this[key] = input[key];
      }
    });
  }
}

export namespace Vacancy {
  export namespace Input {
    export type constructor = {
      localization: string;
      id?: string;
    };
  }
  export namespace Output {
    export type GetState = {
      localization: string;
      id: string;
    };
  }
}
