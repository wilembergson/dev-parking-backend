import { differenceInHours } from 'date-fns';
import { EmployeeUser } from './employee-user';
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
  private employeeUser: EmployeeUser

  constructor(input: Schedule.Input.constructor) {
    this.id = new ID(input.id);
    this.vehiclePlate = input.vehiclePlate;
    this.checkIn = input.checkIn ? input.checkIn : new Date;
    this.checkOut = input.checkOut ? input.checkOut : null;
    this.pricePerHour = parseFloat(input.pricePerHour.toFixed(2))
    this.priceTotal = input.priceTotal ? input.priceTotal : null;
    this.finished = input.finished ? input.finished : false;
  }

  addCustomer(customer: Customer): void {
    this.customer = customer;
  }

  addVacancy(vacancy: Vacancy): void {
    this.vacancy = vacancy;
  }

  addEmployeeUser(employeeUser: EmployeeUser): void{
    this.employeeUser = employeeUser
  }
  
  getPriceTotal(): number {
    if (!this.priceTotal) {
      const checkOut = (this.checkOut ? this.checkOut : new Date())
      const hours = differenceInHours(checkOut, this.checkIn) +1
      return hours * this.pricePerHour
    }
    return this.priceTotal
  }
  
  setFinished() {
    this.checkOut = new Date()
    this.priceTotal = this.getPriceTotal()
    this.finished = true
  }

  getState(): Schedule.Output.GetState {
    return {
      id: this.id.value,
      vehiclePlate: this.vehiclePlate,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      pricePerHour: this.pricePerHour,
      priceTotal: this.getPriceTotal(),
      finished: this.finished,
      vacancy: this.vacancy,
      customer: this.customer,
      employeeUser: this.employeeUser
    };
  }

  getInformations(): Schedule.Output.GetInformations {
    return {
      id: this.id.value,
      vehiclePlate: this.vehiclePlate,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      pricePerHour: this.pricePerHour,
      priceTotal: this.getPriceTotal(),
      finished: this.finished,
      vacancy: this.vacancy.getState(),
      customer: this.customer.getState(),
      employeeUser: this.employeeUser.getInformations()
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
      checkIn?: Date;
      checkOut?: Date | null;
      pricePerHour: number
      priceTotal?: number | null,
      finished?: boolean
    };
  }
  export namespace Output {
    export type GetState = {
      id: string;
      vehiclePlate: string;
      checkIn: Date;
      checkOut: Date | null;
      pricePerHour: number
      priceTotal: number | null,
      finished: boolean
      vacancy: Vacancy;
      customer: Customer;
      employeeUser: EmployeeUser;
    };
    export type GetInformations = {
      id: string;
      vehiclePlate: string;
      checkIn: Date;
      checkOut: Date | null;
      pricePerHour: number
      priceTotal: number | null,
      finished: boolean
      vacancy: Vacancy.Output.GetState;
      customer: Customer.Output.GetState;
      employeeUser: EmployeeUser.Output.getInformations;
    };
  }
}
