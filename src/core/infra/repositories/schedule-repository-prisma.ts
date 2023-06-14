import { Customer, Vacancy } from '@domain/entities';
import { Schedule } from '@domain/entities/schedule';
import { ScheduleNotFound } from '@domain/exceptions';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';
import { PrismaClient } from '@prisma/client';
import { Database } from 'src/core/infra/database';

export class ScheduleRepositoryPrisma implements ScheduleRepository {
  constructor(private readonly database: Database<PrismaClient>) { }

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
        customer: true,
        vacancy: true,
      },
    });
    if (!data) throw new ScheduleNotFound();
    const vacancy = new Vacancy({
      id: data.vacancy.id,
      localization: data.vacancy.localization,
      occupied: data.vacancy.occupied
    });
    const customer = new Customer({
      id: data.customer.id,
      name: data.customer.name,
      rg: data.customer.rg
    });
    const schedule = new Schedule({
      id: data.id,
      vehiclePlate: data.vehiclePlate,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    });
    schedule.addCustomer(customer);
    schedule.addVacancy(vacancy);
    return schedule;
  }

  async findMany(): Promise<Schedule[]> {
    const data = await this.database.getConnection().schedule.findMany({
      include: {
        customer: true,
        vacancy: true,
      },
    });

    return data.map((item) => {
      const vacancy = new Vacancy({
        id: item.vacancy.id,
        localization: item.vacancy.localization,
        occupied: item.vacancy.occupied
      });
      const car = new Customer({
        id: item.customer.id,
        name: item.customer.name,
        rg: item.customer.rg
      });

      const schedule = new Schedule({
        id: item.id,
        vehiclePlate: item.vehiclePlate,
        checkIn: item.checkIn,
        checkOut: item.checkOut,
      });
      schedule.addCustomer(car);
      schedule.addVacancy(vacancy);
      return schedule;
    });
  }

  async save(schedule: Schedule): Promise<void> {
    try {
      const { id, vehiclePlate, checkIn, checkOut, vacancy, customer } = schedule.getState();
      await this.database.getConnection().schedule.create({
        data: {
          id,
          vehiclePlate,
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
                occupied: vacancy.getState().occupied
              },
            },
          },
          customer: {
            connectOrCreate: {
              where: {
                id: customer.getState().id,
              },
              create: {
                id: customer.getState().id,
                name: customer.getState().name,
                rg: customer.getState().rg
              },
            },
          },
        },
        include: {
          vacancy: true,
          customer: true,
        },
      });
    } catch (error) { }
  }
}
