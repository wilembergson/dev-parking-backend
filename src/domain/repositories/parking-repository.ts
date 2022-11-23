import { Parking } from '@domain/entities';

export interface ParkingRepository {
  findOne(input: ParkingRepository.Input.FindOne): Promise<Parking | null>;

  save(parking: Parking): Promise<void>;
}

export namespace ParkingRepository {
  export namespace Input {
    export type FindOne = {
      localization: string;
    };
  }
}
