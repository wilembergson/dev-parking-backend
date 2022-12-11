import { CarNotFound } from '@domain/exceptions';
import { CarRepository } from '@domain/repositories';

export class DeleteCar {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(input: DeleteCar.Input.FindOne): Promise<void> {
    let foundCar;
    try {
      foundCar = await this.carRepository.findOne({ id: input.id });
      if (!foundCar) throw new CarNotFound();
      await this.carRepository.delete({ id: input.id });
    } catch (error) {
      console.log(error);
    }
  }
}

export namespace DeleteCar {
  export namespace Input {
    export type FindOne = Partial<{
      id: string;
      plate: string;
    }>;
  }
}
