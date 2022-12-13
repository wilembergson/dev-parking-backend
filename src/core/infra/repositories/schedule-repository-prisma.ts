import { Car, Vacancy } from '@domain/entities';
import { Schedule } from '@domain/entities/schedule';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';
import { PrismaClient } from '@prisma/client';
import { Database } from 'src/core/infra/database';

export class ScheduleRepositoryPrisma implements ScheduleRepository {
  constructor(private readonly database: Database<PrismaClient>) {}

  async delete(input: ScheduleRepository.Input.Delete): Promise<void> {
    await this.database.getConnection().schedule.delete({
      where: {
        id: input.id,
      },
    });
  }

  async findSchedule(
    input: ScheduleRepository.Input.FindSchedule,
  ): Promise<Schedule> {
    const data = await this.database.getConnection().schedule.findFirst({
      where: {
        id: input.id,
      },
      include: {
        car: true,
        vacancy: true,
      },
    });
    if (!data) throw new Error();
    const vacancy = new Vacancy({
      id: data.vacancy.id,
      localization: data.vacancy.localization,
    });
    const car = new Car({
      id: data.car.id,
      name: data.car.name,
      brand: data.car.brand,
      plate: data.car.plate,
    });
    const schedule = new Schedule({
      id: data.id,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    });
    schedule.addCar(car);
    schedule.addVacancy(vacancy);
    return schedule;
  }

  async findMany(): Promise<Schedule[]> {
    const data = await this.database.getConnection().schedule.findMany({
      include: {
        car: true,
        vacancy: true,
      },
    });

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

      const schedule = new Schedule({
        id: item.id,
        checkIn: item.checkIn,
        checkOut: item.checkOut,
      });
      schedule.addCar(car);
      schedule.addVacancy(vacancy);
      return schedule;
    });
  }

  async save(schedule: Schedule): Promise<void> {
    try {
      const { id, checkIn, checkOut, vacancy, car } = schedule.getState();
      await this.database.getConnection().schedule.create({
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
    } catch (error) {}
  }
}
