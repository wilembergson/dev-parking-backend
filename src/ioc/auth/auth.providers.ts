import { AuthDependencies } from './auth.dependencies';
import { Database, PrismaDatabase } from '@infra/database';
import { UserRepositoryPrisma } from '@infra/repositories';
import { Decrypter, Encrypter, HashComparer, Hasher } from '@application/protocols/cryptografy';
import { CreateUserUseCase, GetUser, LoginUseCase } from '@application/use-cases';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { BcryptAdapter } from '@infra/adapters/cryptografy/bcrypt-adapter';
import { CreateUser } from '@domain/use-cases/user';
import { JwtAdapter } from '@infra/adapters/cryptografy/jwt-adapter';
import { UserRepository } from '@domain/repositories';
import { Login } from '@domain/use-cases/auth';

const databaseProvider: ClassProvider<Database> = {
  provide: AuthDependencies.Database,
  useClass: PrismaDatabase,
};

const UserRepositoryProvider: FactoryProvider<UserRepository> = {
  provide: AuthDependencies.UserRepository,
  useFactory: (database: Database) => new UserRepositoryPrisma(database),
  inject: [AuthDependencies.Database],
};

const bcryptProvider: ClassProvider<Hasher> = {
  provide: AuthDependencies.BcryptAdapter,
  useClass: BcryptAdapter
}

const jwtProvider: FactoryProvider<Encrypter | Decrypter> = {
  provide: AuthDependencies.JwtAdapter,
  useFactory: () => new JwtAdapter(process.env.JWT_SECRET!)
}

const createUserProvider: FactoryProvider<CreateUser> = {
  provide: AuthDependencies.CreateUser,
  useFactory: (userRepository: UserRepository, bcryptAdapter: Hasher) =>
    new CreateUserUseCase(userRepository, bcryptAdapter),
  inject: [AuthDependencies.UserRepository, AuthDependencies.BcryptAdapter],
};

const loginProvider: FactoryProvider<Login> = {
  provide: AuthDependencies.Login,
  useFactory: (userRepository: UserRepository, hashComparer: HashComparer, encrypter: Encrypter) =>
    new LoginUseCase( userRepository, hashComparer, encrypter),
  inject: [AuthDependencies.UserRepository, AuthDependencies.BcryptAdapter, AuthDependencies.JwtAdapter]
}

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
  bcryptProvider,
  jwtProvider,
  loginProvider
];
