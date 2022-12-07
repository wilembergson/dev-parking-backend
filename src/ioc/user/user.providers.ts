import { CreateUser } from '@application/use-cases';
import { UserRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { UserRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { UserDependencies } from './user.dependencies';

const databaseProvider: ClassProvider<Database> = {
  provide: UserDependencies.Database,
  useClass: PrismaDatabase,
};

const UserRepositoryProvider: FactoryProvider<UserRepository> = {
  provide: UserDependencies.UserRepository,
  useFactory: (database: Database) => new UserRepositoryPrisma(database),
  inject: [UserDependencies.Database],
};

const createUserProvider: FactoryProvider<CreateUser> = {
  provide: UserDependencies.CreateUser,
  useFactory: (userRepository: UserRepository) =>
    new CreateUser(userRepository),
  inject: [UserDependencies.UserRepository],
};

export const providers: Provider[] = [
  UserRepositoryProvider,
  createUserProvider,
  databaseProvider,
];
