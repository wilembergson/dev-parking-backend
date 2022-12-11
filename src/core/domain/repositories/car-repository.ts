import { Car } from '@domain/entities';

export interface CarRepository {
  findOne(input: CarRepository.Input.FindOne): Promise<Car | null>;

  save(car: Car): Promise<void>;

  delete(input: CarRepository.Input.FindOne): Promise<void>;

  //listCars(): Promise<Car[] | null>;
}

export namespace CarRepository {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      plate: string;
    }>;
  }
}
