import { CarRepository } from '@domain/repositories';
import { CarRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { CarDependencies } from './car.dependencies';
import { CreateCar } from '@application/use-cases';
import { Database, PrismaDatabase } from '@infra/database';

const databaseProvider: ClassProvider<Database> = {
  provide: CarDependencies.Database,
  useClass: PrismaDatabase,
};

const carRepositoryProvider: FactoryProvider<CarRepository> = {
  provide: CarDependencies.CarRepository,
  useFactory: (database: Database) => new CarRepositoryPrisma(database),
  inject: [CarDependencies.Database],
};

const createCarProvider: FactoryProvider<CreateCar> = {
  provide: CarDependencies.CreateCar,
  useFactory: (carRepository: CarRepository) => new CreateCar(carRepository),
  inject: [CarDependencies.CarRepository],
};

export const providers: Provider[] = [
  carRepositoryProvider,
  createCarProvider,
  databaseProvider,
];

export const providersExporteds: Provider[] = [carRepositoryProvider];
