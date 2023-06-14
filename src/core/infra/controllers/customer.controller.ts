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
import { CustomerDependencies } from 'src/ioc/customer';
import { CreateCustomer, FindCustomer } from '@domain/use-cases/customer';
import { CreateCustomerDTO } from './dto/customer';

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
  async createCustomer(@Body() body: CreateCustomerDTO): Promise<void> {
    return await this.createCustomerService.execute({
      name: body.name,
      rg: body.rg
    });
  }

  @Get(':rg')
  async findCustomer(@Param() params): Promise<Customer> {
    return await this.findCustomerService.execute({
      rg: params.rg,
    });
  }

  @Delete(':rg')
  async deleteCustomer(@Param() params): Promise<void> {
    await this.deleteCustomerService.execute({ id: params.id });
  }
}
