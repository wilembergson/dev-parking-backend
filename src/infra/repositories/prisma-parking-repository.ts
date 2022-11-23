import { Parking } from '@domain/entities';
import { ParkingRepository } from '@domain/repositories';
import { Database } from '@infra/database';
import { PrismaClient } from '@prisma/client';

export class PrismaParkingRepository implements ParkingRepository {
  constructor(private readonly database: Database<PrismaClient>) {}
  async findOne(
    input: ParkingRepository.Input.FindOne,
  ): Promise<Parking | null> {
    const data = await this.database.getConnection().parking.findFirst({
      where: { localization: input.localization },
    });
    if (!data) return null;
    return new Parking({
      localization: data.localization,
      vacancies: data.vacancies,
    });
  }

  async save(parking: Parking): Promise<void> {
    const { id, localization, vacancies } = parking.getState();
    await this.database.getConnection().parking.create({
      data: { id, localization, vacancies },
    });
  }
}
