import { Car } from '@domain/entities';
import { CarNotFound } from '@domain/exceptions';
import { CarRepository } from '@domain/repositories';

export class FindCar {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(input: FindCar.Input.FindOne): Promise<Car | null> {
    let foundCar;
    try {
      foundCar = await this.carRepository.findOne({ plate: input.plate });
      console.log(foundCar);
      if (foundCar === null) throw new CarNotFound();
    } catch (error) {
      console.log(error);
    }
    return foundCar;
  }
}

export namespace FindCar {
  export namespace Input {
    export type FindOne = {
      plate: string;
    };
  }
}
