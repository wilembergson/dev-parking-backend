import { Car } from '@domain/entities';
import { CarRepository } from '@domain/repositories';
import { Database } from '@infra/database';
import { PrismaClient } from '@prisma/client';

export class PrismaCarRepository implements CarRepository {
  constructor(private readonly database: Database<PrismaClient>) {}

  async findOne(input: CarRepository.Input.FindOne): Promise<Car | null> {
    const data = await this.database.getConnection().car.findFirst({
      where: {
        OR: [
          {
            id: input.id,
          },
          {
            plate: input.plate,
          },
        ],
      },
    });
    if (!data) return null;
    return new Car({
      name: data.name,
      brand: data.brand,
      plate: data.plate,
    });
  }

  async save(car: Car): Promise<void> {
    const { id, name, brand, plate } = car.getState();
    await this.database.getConnection().car.create({
      data: { id, name, brand, plate },
    });
  }
}
