import { CustomerRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { CustomerDependencies } from './customer.dependencies';
import { Database, PrismaDatabase } from '@infra/database';
import { DeleteCustomer } from '@application/use-cases/delete-customer';
import { CreateCustomerUseCase, FindCustomer } from '@application/use-cases';
import { CustomerRepository } from '@domain/repositories';
import { CreateCustomer } from '@domain/use-cases/customer';

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
  useFactory: (carRepository: CustomerRepository) => new CreateCustomerUseCase(carRepository),
  inject: [CustomerDependencies.CustomerRepository],
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const findCustomerProvider: FactoryProvider<FindCustomer> = {
  provide: CustomerDependencies.FindCustomer,
  useFactory: (carRepository: CustomerRepository) => new FindCustomer(carRepository),
  inject: [CustomerDependencies.CustomerRepository],
};

const deleteCustomerProvider: FactoryProvider<DeleteCustomer> = {
  provide: CustomerDependencies.DeleteCustomer,
  useFactory: (carRepository: CustomerRepository) => new DeleteCustomer(carRepository),
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
