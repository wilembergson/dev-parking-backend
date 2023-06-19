import { EmployeeGetUser, UpdateEmployeeUser } from '@application/use-cases';
import { EmployeeUserRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { EmployeeUserRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { EmployeeUserDependencies } from './employee-user.dependencies';
import { GetUser, UpdateUser } from '@domain/use-cases/user';
import { BcryptAdapter } from '@infra/adapters/cryptografy/bcrypt-adapter';
import { Hasher } from '@application/protocols/cryptografy';

const databaseProvider: ClassProvider<Database> = {
  provide: EmployeeUserDependencies.Database,
  useClass: PrismaDatabase,
};

const employeeUserRepositoryProvider: FactoryProvider<EmployeeUserRepository> = {
  provide: EmployeeUserDependencies.EmployeeUserRepository,
  useFactory: (database: Database) => new EmployeeUserRepositoryPrisma(database),
  inject: [EmployeeUserDependencies.Database],
};

const bcryptProvider: ClassProvider<Hasher> = {
  provide: EmployeeUserDependencies.BcryptAdapter,
  useClass: BcryptAdapter
}

const updateEmployeeUserProvider: FactoryProvider<UpdateUser> = {
  provide: EmployeeUserDependencies.UpdateUser,
  useFactory: (userRepository: EmployeeUserRepository, bcryptAdapter: Hasher) =>
    new UpdateEmployeeUser(userRepository, bcryptAdapter),
  inject: [EmployeeUserDependencies.EmployeeUserRepository, EmployeeUserDependencies.BcryptAdapter],
};

const getUserProvider: FactoryProvider<GetUser> = {
  provide: EmployeeUserDependencies.GetUser,
  useFactory: (userRepository: EmployeeUserRepository) => new EmployeeGetUser(userRepository),
  inject: [EmployeeUserDependencies.EmployeeUserRepository],
};


export const providers: Provider[] = [
  employeeUserRepositoryProvider,
  databaseProvider,
  updateEmployeeUserProvider,
  getUserProvider,
  bcryptProvider
];

export const providersExporteds: Provider[] = [employeeUserRepositoryProvider];