import { Customer } from './customer';
import { ID } from './id';
import { Vacancy } from './vacancy';

export class Schedule {
  private readonly id: ID;
  private readonly vehiclePlate: string;
  private readonly checkIn: Date;
  private readonly checkOut: Date | null;
  private vacancy: Vacancy;
  private customer: Customer;

  constructor(input: Schedule.Input.constructor) {
    this.vehiclePlate;
    this.checkIn = input.checkIn;
    this.checkOut = input.checkOut ? input.checkOut : null;
    this.id = new ID(input.id);
  }

  addCar(customer: Customer): void {
    this.customer = customer;
  }
  addVacancy(vacancy: Vacancy): void {
    this.vacancy = vacancy;
  }
  getState(): Schedule.Output.GetState {
    return {
      vehiclePlate: this.vehiclePlate,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      vacancy: this.vacancy,
      customer: this.customer,
      id: this.id.value,
    };
  }

  update(input: Partial<Schedule.Output.GetState>): void {
    Object.keys(input).forEach((key) => {
      if (input[key] !== undefined && key !== 'id') {
        this[key] = input[key];
      }
    });
  }
}

export namespace Schedule {
  export namespace Input {
    export type constructor = {
      vehiclePlate: string;
      checkIn: Date;
      checkOut: Date | null;
      id?: string;
    };
  }
  export namespace Output {
    export type GetState = {
      vehiclePlate: string;
      checkIn: Date;
      checkOut: Date | null;
      vacancy: Vacancy;
      customer: Customer;
      id: string;
    };
  }
}
