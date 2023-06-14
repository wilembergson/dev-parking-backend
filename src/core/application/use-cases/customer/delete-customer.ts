import { CustomerNotFound } from '@domain/exceptions';
import { CustomerRepository } from '@domain/repositories';
import { DeleteCustomer } from '@domain/use-cases/customer';

export class DeleteCustomerUseCase implements DeleteCustomer {
  constructor(private readonly customerRepository: CustomerRepository) { }

  async execute(input: Partial<{ rg: string; id: string; }>): Promise<void> {
    const customer = await this.customerRepository.findOne({ rg: input.rg });
    if (!customer) throw new CustomerNotFound();
    await this.customerRepository.delete({ id: customer.getState().id });
  }
}