import { Customer } from '@domain/entities';
import { CustomerFound } from '@domain/exceptions';
import { CustomerRepository } from '@domain/repositories';
import { CreateCustomer } from '@domain/use-cases/customer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCustomerUseCase implements CreateCustomer {
  constructor(private readonly customerRepository: CustomerRepository) { }

  async execute(input: CreateCustomer.Input): Promise<void> {
    const foundCustomer = await this.customerRepository.findOne({ rg: input.rg });
    if (foundCustomer) throw new CustomerFound();
    const customer = new Customer({
      name: input.name,
      rg: input.rg
    });
    await this.customerRepository.save(customer);
  }


}
