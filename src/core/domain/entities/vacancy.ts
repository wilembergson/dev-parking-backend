import { ID } from './id';

export class Vacancy {
  private readonly id: ID;
  private readonly localization: string;
  private occupied: boolean;

  constructor(input: Vacancy.Input.constructor) {
    this.id = new ID(input.id);
    this.localization = input.localization;
    this.occupied = input.occupied;
  }

  getState(): Vacancy.Output.GetState {
    return {
      id: this.id.value,
      localization: this.localization,
      occupied: this.occupied
    };
  }

  setOccupied(occupied: boolean) {
    this.occupied = occupied
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
      id?: string;
      localization: string;
      occupied: boolean;
    };
  }
  export namespace Output {
    export type GetState = {
      id: string;
      localization: string;
      occupied: boolean;
    };
  }
}
