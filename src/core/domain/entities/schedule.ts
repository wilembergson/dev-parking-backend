import { differenceInHours } from 'date-fns';
import { Customer } from './customer';
import { Vacancy } from './vacancy';
import { ID } from './id';

export class Schedule {
  private readonly id: ID;
  private readonly vehiclePlate: string;
  private readonly checkIn: Date;
  private checkOut: Date | null;
  private pricePerHour: number;
  private priceTotal: number | null;
  private finished: boolean;
  private vacancy: Vacancy;
  private customer: Customer;

  constructor(input: Schedule.Input.constructor) {
    this.id = new ID(input.id);
    this.vehiclePlate = input.vehiclePlate;
    this.checkIn = input.checkIn;
    this.checkOut = input.checkOut ? input.checkOut : null;
    this.pricePerHour = parseFloat(input.pricePerHour.toFixed(2))
    this.priceTotal = null;
    this.finished = false;
  }

  addCustomer(customer: Customer): void {
    this.customer = customer;
  }

  addVacancy(vacancy: Vacancy): void {
    this.vacancy = vacancy;
  }

  setFinished() {
    this.checkOut = new Date()
    this.priceTotal = this.getPriceTotal()
    this.finished = true
  }

  getPriceTotal(): number {
    if (!this.priceTotal) {
      const checkOut = (this.checkOut ? this.checkOut : new Date())
      const time = differenceInHours(checkOut, this.checkIn)
      return time * this.pricePerHour
    }
    return this.priceTotal
  }

  getState(): Schedule.Output.GetState {
    return {
      id: this.id.value,
      vehiclePlate: this.vehiclePlate,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      pricePerHour: this.pricePerHour,
      finished: this.finished,
      vacancy: this.vacancy,
      customer: this.customer,
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
      id?: string;
      vehiclePlate: string;
      checkIn: Date;
      checkOut: Date | null;
      pricePerHour: number
    };
  }
  export namespace Output {
    export type GetState = {
      id: string;
      vehiclePlate: string;
      checkIn: Date;
      checkOut: Date | null;
      pricePerHour: number
      finished: boolean
      vacancy: Vacancy;
      customer: Customer;
    };
  }
}
