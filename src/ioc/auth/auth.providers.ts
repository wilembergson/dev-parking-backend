import { UserRepository } from '@domain/repositories';
import { AuthDependencies } from './auth.dependencies';
import { Database, PrismaDatabase } from '@infra/database';
import { UserRepositoryPrisma } from '@infra/repositories';
import { Hasher } from '@application/protocols/cryptografy';
import { CreateUser, GetUser } from '@application/use-cases';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { BcryptAdapter } from '@infra/adapters/cryptografy/bcrypt-adapter';

const databaseProvider: ClassProvider<Database> = {
  provide: AuthDependencies.Database,
  useClass: PrismaDatabase,
};

const UserRepositoryProvider: FactoryProvider<UserRepository> = {
  provide: AuthDependencies.UserRepository,
  useFactory: (database: Database) => new UserRepositoryPrisma(database),
  inject: [AuthDependencies.Database],
};

const bcryptProvider: ClassProvider<Hasher> ={
  provide: AuthDependencies.BcryptAdapter,
  useClass: BcryptAdapter
}

const createUserProvider: FactoryProvider<CreateUser> = {
  provide: AuthDependencies.CreateUser,
  useFactory: (userRepository: UserRepository, bcryptAdapter:Hasher) =>
    new CreateUser(userRepository, bcryptAdapter),
  inject: [AuthDependencies.UserRepository, AuthDependencies.BcryptAdapter],
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
  bcryptProvider
];
