import { Car } from '@domain/entities';
import { CarNotFound } from '@domain/exceptions';
import { CarRepository } from '@domain/repositories';

export class FindCar {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(input: FindCar.Input.FindOne): Promise<Car> {
    const car = await this.carRepository.findOne({ plate: input.plate });
    console.log(car);
    if (!car) throw new CarNotFound();

    return car;
  }
}

export namespace FindCar {
  export namespace Input {
    export type FindOne = {
      plate: string;
    };
  }
}
