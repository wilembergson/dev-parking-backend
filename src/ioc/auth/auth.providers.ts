import { AuthDependencies } from './auth.dependencies';
import { Database, PrismaDatabase } from '@infra/database';
import { EmployeeUserRepositoryPrisma } from '@infra/repositories';
import { Decrypter, Encrypter, HashComparer, Hasher } from '@application/protocols/cryptografy';
import { CreateEmployeeUserUseCase, EmployeeGetUser, EmployeeLoginUseCase } from '@application/use-cases';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { BcryptAdapter } from '@infra/adapters/cryptografy/bcrypt-adapter';
import { CreateUser } from '@domain/use-cases/user';
import { JwtAdapter } from '@infra/adapters/cryptografy/jwt-adapter';
import { EmployeeUserRepository } from '@domain/repositories';
import { Login } from '@domain/use-cases/auth';

const databaseProvider: ClassProvider<Database> = {
  provide: AuthDependencies.Database,
  useClass: PrismaDatabase,
};

const employeeUserRepositoryProvider: FactoryProvider<EmployeeUserRepository> = {
  provide: AuthDependencies.EmployeeUserRepository,
  useFactory: (database: Database) => new EmployeeUserRepositoryPrisma(database),
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

const createEmployeeUserProvider: FactoryProvider<CreateUser> = {
  provide: AuthDependencies.CreateEmployeeUser,
  useFactory: (userRepository: EmployeeUserRepository, bcryptAdapter: Hasher) =>
    new CreateEmployeeUserUseCase(userRepository, bcryptAdapter),
  inject: [AuthDependencies.EmployeeUserRepository, AuthDependencies.BcryptAdapter],
};

const employeeLoginProvider: FactoryProvider<Login> = {
  provide: AuthDependencies.EmployeeLogin,
  useFactory: (userRepository: EmployeeUserRepository, hashComparer: HashComparer, encrypter: Encrypter) =>
    new EmployeeLoginUseCase(userRepository, hashComparer, encrypter),
  inject: [AuthDependencies.EmployeeUserRepository, AuthDependencies.BcryptAdapter, AuthDependencies.JwtAdapter]
}

const getEmployeeUserProvider: FactoryProvider<EmployeeGetUser> = {
  provide: AuthDependencies.GetEmployeeUser,
  useFactory: (userRepository: EmployeeUserRepository) => new EmployeeGetUser(userRepository),
  inject: [AuthDependencies.EmployeeUserRepository],
};

export const providers: Provider[] = [
  employeeUserRepositoryProvider,
  databaseProvider,
  createEmployeeUserProvider,
  getEmployeeUserProvider,
  bcryptProvider,
  jwtProvider,
  employeeLoginProvider
];
