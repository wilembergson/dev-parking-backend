import { Customer } from '@domain/entities';
import { CustomerFound } from '@domain/exceptions';
import { CustomerRepository } from '@domain/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCustomer {
  constructor(private readonly customerRepository: CustomerRepository) { }

  async execute(input: InCreateCar.Input): Promise<void> {
    const foundCar = await this.customerRepository.findOne({ rg: input.rg });
    if (foundCar) throw new CustomerFound();
    const customer = new Customer({
      name: input.name,
      rg: input.rg
    });
    await this.customerRepository.save(customer);
  }
}

export namespace InCreateCar {
  export type Input = {
    name: string;
    rg: string;
  };
}
