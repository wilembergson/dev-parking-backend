import { Car } from './car';
import { ID } from './id';
import { Vacancy } from './vacancy';

export class Scheduleing {
  private readonly id: ID;
  private readonly checkIn: Date;
  private readonly checkOut: Date | null;
  private vacancy: Vacancy;
  private car: Car;

  constructor(input: Scheduleing.Input.constructor) {
    this.checkIn = input.checkIn;
    this.checkOut = input.checkOut ? input.checkOut : null;
    this.id = new ID(input.id);
  }

  addCar(car: Car): void {
    this.car = car;
  }
  addVacancy(vacancy: Vacancy): void {
    this.vacancy = vacancy;
  }
  getState(): Scheduleing.Output.GetState {
    return {
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      vacancy: this.vacancy,
      car: this.car,
      id: this.id.value,
    };
  }

  update(input: Partial<Scheduleing.Output.GetState>): void {
    Object.keys(input).forEach((key) => {
      if (input[key] !== undefined && key !== 'id') {
        this[key] = input[key];
      }
    });
  }
}

export namespace Scheduleing {
  export namespace Input {
    export type constructor = {
      checkIn: Date;
      checkOut: Date | null;
      id?: string;
    };
  }
  export namespace Output {
    export type GetState = {
      checkIn: Date;
      checkOut: Date | null;
      vacancy: Vacancy;
      car: Car;
      id: string;
    };
  }
}
