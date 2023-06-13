import { DeleteCustomer } from '@application/use-cases/delete-customer';
import { Customer } from '@domain/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
} from '@nestjs/common';
import { FindCustomer } from '@application/use-cases';
import { CustomerDependencies } from 'src/ioc/customer';
import { CreateCustomer } from '@domain/use-cases/customer';

@Controller('customer')
@Injectable()
export class CustomerController {
  constructor(
    @Inject(CustomerDependencies.CreateCustomer)
    private readonly createCustomerService: CreateCustomer,
    @Inject(CustomerDependencies.FindCustomer)
    private readonly findCustomerService: FindCustomer,
    @Inject(CustomerDependencies.DeleteCustomer)
    private readonly deleteCustomerService: DeleteCustomer,
  ) { }

  @Post()
  async createCustomer(@Body() body: any): Promise<void> {
    return this.createCustomerService.execute({
      name: body.name,
      rg: body.rg
    });
  }

  @Get(':plate')
  async findCustomer(@Param() params): Promise<Customer | null> {
    const customer = await this.findCustomerService.execute({
      rg: params.rg,
    });
    return customer;
  }

  @Delete(':id')
  async deleteCustomer(@Param() params): Promise<void> {
    await this.deleteCustomerService.execute({ id: params.id });
  }
}
