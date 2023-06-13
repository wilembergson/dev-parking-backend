import { EmployeeGetUser, UpdateUser } from '@application/use-cases';
import { DeleteUser } from '@application/use-cases/delete-user';
import { EmployeeUserRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { EmployeeUserRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { UserDependencies } from './user.dependencies';
import { BcryptAdapter } from '@infra/adapters/cryptografy/bcrypt-adapter';

const databaseProvider: ClassProvider<Database> = {
  provide: UserDependencies.Database,
  useClass: PrismaDatabase,
};

const UserRepositoryProvider: FactoryProvider<EmployeeUserRepository> = {
  provide: UserDependencies.UserRepository,
  useFactory: (database: Database) => new EmployeeUserRepositoryPrisma(database),
  inject: [UserDependencies.Database],
};

/*const createUserProvider: FactoryProvider<CreateUser> = {
  provide: UserDependencies.CreateUser,
  useFactory: (userRepository: UserRepository) =>
    new CreateUser(userRepository),
  inject: [UserDependencies.UserRepository],
};*/

const updateUserProvider: FactoryProvider<UpdateUser> = {
  provide: UserDependencies.UpdateUser,
  useFactory: (userRepository: EmployeeUserRepository) =>
    new UpdateUser(userRepository),
  inject: [UserDependencies.UserRepository],
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
  //createUserProvider,
  databaseProvider,
  updateUserProvider,
  deleteUserProvider,
  getUserProvider,
];
