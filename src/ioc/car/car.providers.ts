import { CarRepository } from '@domain/repositories';
import { CarRepositoryPrisma } from '@infra/repositories';
import { ClassProvider, FactoryProvider, Provider } from '@nestjs/common';
import { CarDependencies } from './car.dependencies';
import { Database, PrismaDatabase } from '@infra/database';
import { DeleteCar } from '@application/use-cases/delete-car';
import { CreateCar, FindCar } from '@application/use-cases';

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
const findCarProvider: FactoryProvider<FindCar> = {
  provide: CarDependencies.FindCar,
  useFactory: (carRepository: CarRepository) => new FindCar(carRepository),
  inject: [CarDependencies.CarRepository],
};

const deleteCarProvider: FactoryProvider<DeleteCar> = {
  provide: CarDependencies.DeleteCar,
  useFactory: (carRepository: CarRepository) => new DeleteCar(carRepository),
  inject: [CarDependencies.CarRepository],
};

export const providers: Provider[] = [
  carRepositoryProvider,
  createCarProvider,
  findCarProvider,
  deleteCarProvider,
  databaseProvider,
];

export const providersExporteds: Provider[] = [carRepositoryProvider];
