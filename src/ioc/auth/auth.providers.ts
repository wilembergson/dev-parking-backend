import { CreateUser, GetUser } from '@application/use-cases';
import { UserRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { UserRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { AuthDependencies } from './auth.dependencies';

const databaseProvider: ClassProvider<Database> = {
  provide: AuthDependencies.Database,
  useClass: PrismaDatabase,
};

const UserRepositoryProvider: FactoryProvider<UserRepository> = {
  provide: AuthDependencies.UserRepository,
  useFactory: (database: Database) => new UserRepositoryPrisma(database),
  inject: [AuthDependencies.Database],
};

const createUserProvider: FactoryProvider<CreateUser> = {
  provide: AuthDependencies.CreateUser,
  useFactory: (userRepository: UserRepository) =>
    new CreateUser(userRepository),
  inject: [AuthDependencies.UserRepository],
};

const getUserProvider: FactoryProvider<GetUser> = {
  provide: AuthDependencies.GetUser,
  useFactory: (userRepository: UserRepository) => new GetUser(userRepository),
  inject: [AuthDependencies.UserRepository],
};

export const providers: Provider[] = [
  UserRepositoryProvider,
  databaseProvider,
  createUserProvider,
  getUserProvider,
];
