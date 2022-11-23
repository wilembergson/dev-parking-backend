import { Parking } from '@domain/entities';
import { ParkingRepository } from '@domain/repositories';

export class CreateParking {
  constructor(private readonly parkingRepository: ParkingRepository) {}

  async execute(input: CreateParking.Input): Promise<void> {
    const foundParking = await this.parkingRepository.findOne({
      localization: input.localization,
    });
    if (foundParking) throw Error('Já há um estacionamento nesta localização.');
    const parking = new Parking({
      localization: input.localization,
      vacancies: input.vacancies,
    });
    await this.parkingRepository.save(parking);
  }
}

export namespace CreateParking {
  export type Input = {
    localization: string;
    vacancies: number;
  };
}
