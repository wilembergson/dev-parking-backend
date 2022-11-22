import { Car } from '../entities/car';

export interface CarRepository {
  findOne(input: CarRepository.Input.FindOne): Promise<Car | null>;

  save(car: Car): Promise<void>;
}

export namespace CarRepository {
  export namespace Input {
    export type FindOne = {
      board: string;
    };
  }
}
