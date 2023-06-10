import { UpdateUser } from '@application/use-cases';
import { DeleteUser } from '@application/use-cases/delete-user';
import { GetUser } from '@application/use-cases/get-user';
import { UserRepository } from '@domain/repositories';
import { Database, PrismaDatabase } from '@infra/database';
import { UserRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { UserDependencies } from './user.dependencies';
import { BcryptAdapter } from '@infra/adapters/cryptografy/bcrypt-adapter';

const databaseProvider: ClassProvider<Database> = {
  provide: UserDependencies.Database,
  useClass: PrismaDatabase,
};

const UserRepositoryProvider: FactoryProvider<UserRepository> = {
  provide: UserDependencies.UserRepository,
  useFactory: (database: Database) => new UserRepositoryPrisma(database),
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
  useFactory: (userRepository: UserRepository) =>
    new UpdateUser(userRepository),
  inject: [UserDependencies.UserRepository],
};

const deleteUserProvider: FactoryProvider<DeleteUser> = {
  provide: UserDependencies.DeleteUser,
  useFactory: (userRepository: UserRepository) =>
    new DeleteUser(userRepository),
  inject: [UserDependencies.UserRepository],
};

const getUserProvider: FactoryProvider<GetUser> = {
  provide: UserDependencies.GetUser,
  useFactory: (userRepository: UserRepository) => new GetUser(userRepository),
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
