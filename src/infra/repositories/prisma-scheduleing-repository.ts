import { Car, Scheduleing, Vacancy } from '@domain/entities';
import { ScheduleingRepository } from '@domain/repositories';
import { PrismaDatabase } from '@infra/database';

export class PrismaScheduleingRepository implements ScheduleingRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findMany(): Promise<Scheduleing[] | null> {
    const data = await this.database.getConnection().scheduleing.findMany({
      include: {
        car: true,
        vacancy: true,
      },
    });
    if (!data) return null;

    return data.map((item) => {
      const vacancy = new Vacancy({
        id: item.vacancy.id,
        localization: item.vacancy.localization,
      });
      const car = new Car({
        id: item.car.id,
        name: item.car.name,
        brand: item.car.brand,
        plate: item.car.plate,
      });

      const scheduleing = new Scheduleing({
        id: item.id,
        checkIn: item.checkIn,
        checkOut: item.checkOut,
      });
      scheduleing.addCar(car);
      scheduleing.addVacancy(vacancy);
      return scheduleing;
    });
  }

  async save(scheduleing: Scheduleing): Promise<void> {
    try {
      const { id, checkIn, checkOut, vacancy, car } = scheduleing.getState();
      await this.database.getConnection().scheduleing.create({
        data: {
          id,
          checkIn,
          checkOut,
          vacancy: {
            connectOrCreate: {
              where: {
                id: vacancy.getState().id,
              },
              create: {
                id: vacancy.getState().id,
                localization: vacancy.getState().localization,
              },
            },
          },
          car: {
            connectOrCreate: {
              where: {
                id: car.getState().id,
              },
              create: {
                id: car.getState().id,
                name: car.getState().name,
                brand: car.getState().brand,
                plate: car.getState().plate,
              },
            },
          },
        },
        include: {
          vacancy: true,
          car: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
