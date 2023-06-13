import { Customer } from '@domain/entities';

export interface CustomerRepository {
  findOne(input: CustomerRepository.Input.FindOne): Promise<Customer | null>;

  save(customer: Customer): Promise<void>;

  delete(input: CustomerRepository.Input.FindOne): Promise<void>;

  //listCars(): Promise<Car[] | null>;
}

export namespace CustomerRepository {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      rg: string;
    }>;
  }
}
