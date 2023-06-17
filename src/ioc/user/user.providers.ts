import { EmployeeGetUser, UpdateEmployeeUser } from '@application/use-cases';
import { DeleteUser } from '@application/use-cases/delete-user';
import { EmployeeUserRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { EmployeeUserRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { UserDependencies } from './user.dependencies';
import { UpdateUser } from '@domain/use-cases/user';
import { BcryptAdapter } from '@infra/adapters/cryptografy/bcrypt-adapter';
import { Hasher } from '@application/protocols/cryptografy';

const databaseProvider: ClassProvider<Database> = {
  provide: UserDependencies.Database,
  useClass: PrismaDatabase,
};

const UserRepositoryProvider: FactoryProvider<EmployeeUserRepository> = {
  provide: UserDependencies.UserRepository,
  useFactory: (database: Database) => new EmployeeUserRepositoryPrisma(database),
  inject: [UserDependencies.Database],
};

const bcryptProvider: ClassProvider<Hasher> = {
  provide: UserDependencies.BcryptAdapter,
  useClass: BcryptAdapter
}

const updateEmployeeUserProvider: FactoryProvider<UpdateUser> = {
  provide: UserDependencies.UpdateUser,
  useFactory: (userRepository: EmployeeUserRepository, bcryptAdapter: Hasher) =>
    new UpdateEmployeeUser(userRepository, bcryptAdapter),
  inject: [UserDependencies.UserRepository, UserDependencies.BcryptAdapter],
};

const deleteUserProvider: FactoryProvider<DeleteUser> = {
  provide: UserDependencies.DeleteUser,
  useFactory: (userRepository: EmployeeUserRepository) =>
    new DeleteUser(userRepository),
  inject: [UserDependencies.UserRepository],
};

const getUserProvider: FactoryProvider<EmployeeGetUser> = {
  provide: UserDependencies.GetUser,
  useFactory: (userRepository: EmployeeUserRepository) => new EmployeeGetUser(userRepository),
  inject: [UserDependencies.UserRepository],
};

export const providers: Provider[] = [
  UserRepositoryProvider,
  databaseProvider,
  updateEmployeeUserProvider,
  deleteUserProvider,
  getUserProvider,
  bcryptProvider
];
