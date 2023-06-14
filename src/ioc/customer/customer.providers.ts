import { CustomerRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { CustomerDependencies } from './customer.dependencies';
import { Database, PrismaDatabase } from '@infra/database';
import { CreateCustomerUseCase, FindCustomerUseCase } from '@application/use-cases';
import { CustomerRepository } from '@domain/repositories';
import { CreateCustomer, DeleteCustomer, FindCustomer } from '@domain/use-cases/customer';
import { DeleteCustomerUseCase } from '@application/use-cases/customer';

const databaseProvider: ClassProvider<Database> = {
  provide: CustomerDependencies.Database,
  useClass: PrismaDatabase,
};

const customerRepositoryProvider: FactoryProvider<CustomerRepository> = {
  provide: CustomerDependencies.CustomerRepository,
  useFactory: (database: Database) => new CustomerRepositoryPrisma(database),
  inject: [CustomerDependencies.Database],
};

const createCustomerrProvider: FactoryProvider<CreateCustomer> = {
  provide: CustomerDependencies.CreateCustomer,
  useFactory: (customerRepository: CustomerRepository) => new CreateCustomerUseCase(customerRepository),
  inject: [CustomerDependencies.CustomerRepository],
};

const findCustomerProvider: FactoryProvider<FindCustomer> = {
  provide: CustomerDependencies.FindCustomer,
  useFactory: (customerRepository: CustomerRepository) => new FindCustomerUseCase(customerRepository),
  inject: [CustomerDependencies.CustomerRepository],
};

const deleteCustomerProvider: FactoryProvider<DeleteCustomer> = {
  provide: CustomerDependencies.DeleteCustomer,
  useFactory: (customerRepository: CustomerRepository) => new DeleteCustomerUseCase(customerRepository),
  inject: [CustomerDependencies.CustomerRepository],
};

export const providers: Provider[] = [
  customerRepositoryProvider,
  createCustomerrProvider,
  findCustomerProvider,
  deleteCustomerProvider,
  databaseProvider,
];

export const providersExporteds: Provider[] = [customerRepositoryProvider];
