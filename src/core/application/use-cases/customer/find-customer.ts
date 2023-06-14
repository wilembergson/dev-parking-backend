import { Customer } from '@domain/entities';
import { CustomerNotFound } from '@domain/exceptions';
import { CustomerRepository } from '@domain/repositories';
import { FindCustomer } from '@domain/use-cases/customer';

export class FindCustomerUseCase implements FindCustomer {
  constructor(private readonly customerRepository: CustomerRepository) { }

  async execute(input: FindCustomer.Input): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ rg: input.rg });
    if (!customer) throw new CustomerNotFound();
    return customer;
  }
}


