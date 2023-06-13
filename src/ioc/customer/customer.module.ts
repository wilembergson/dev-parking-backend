import { CustomerController } from '@infra/controllers';
import { Module } from '@nestjs/common';
import { providers, providersExporteds } from './customer.providers';

@Module({
  exports: providersExporteds,
  controllers: [CustomerController],
  providers: providers,
})
export class CustomerModule { }
