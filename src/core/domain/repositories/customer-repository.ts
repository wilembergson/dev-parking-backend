import { Customer } from '@domain/entities';

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;
  
  findOne(input: CustomerRepository.Input.FindOne): Promise<Customer | null>;

  delete(input: CustomerRepository.Input.FindOne): Promise<void>;
}

export namespace CustomerRepository {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      rg: string;
    }>;
  }
}
