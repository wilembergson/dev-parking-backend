import { Customer } from '@domain/entities';
import { CustomerNotFound } from '@domain/exceptions';
import { CustomerRepository } from '@domain/repositories';

export class FindCustomer {
  constructor(private readonly customerRepository: CustomerRepository) { }

  async execute(input: FindCustomer.Input.FindOne): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ rg: input.rg });
    if (!customer) throw new CustomerNotFound();
    return customer;
  }
}

export namespace FindCustomer {
  export namespace Input {
    export type FindOne = {
      rg: string;
    };
  }
}
