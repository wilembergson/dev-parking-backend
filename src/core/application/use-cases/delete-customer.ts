import { CustomerNotFound } from '@domain/exceptions';
import { CustomerRepository } from '@domain/repositories';

export class DeleteCustomer {
  constructor(private readonly customerRepository: CustomerRepository) { }

  async execute(input: DeleteCar.Input.FindOne): Promise<void> {
    const customer = await this.customerRepository.findOne({ id: input.id });
    if (!customer) throw new CustomerNotFound();
    await this.customerRepository.delete({ id: input.id });
  }
}

export namespace DeleteCar {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      rg: string;
    }>;
  }
}
