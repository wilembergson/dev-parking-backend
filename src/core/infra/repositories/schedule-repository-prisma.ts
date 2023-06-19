import { Customer, EmployeeUser, Vacancy } from '@domain/entities';
import { Schedule } from '@domain/entities/schedule';
import { ScheduleNotFound } from '@domain/exceptions';
import { ScheduleRepository } from '@domain/repositories/schedule-repository';
import { PrismaClient } from '@prisma/client';
import { Database } from 'src/core/infra/database';

export class ScheduleRepositoryPrisma implements ScheduleRepository {
  constructor(private readonly database: Database<PrismaClient>) { }

  async update(schedule: Schedule): Promise<void> {
    const { id, vehiclePlate, checkIn, checkOut, pricePerHour, priceTotal, finished } = schedule.getState()
    await this.database.getConnection().schedule.update({
      where: {
        id
      },
      data: {
        vehiclePlate,
        checkIn,
        checkOut,
        pricePerHour,
        priceTotal,
        finished
      }
    })
  }

  async findSchedule(input: ScheduleRepository.Input.FindSchedule): Promise<Schedule> {
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
      pricePerHour: data.pricePerHour.toNumber(),
      priceTotal: data.priceTotal?.toNumber(),
      finished: data.finished
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
        employeeUser: true
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
      const employeeUser = new EmployeeUser({
        id: item.employeeUser.id,
        name: item.employeeUser.name,
        rg: item.employeeUser.rg,
        email: item.employeeUser.email,
        password: item.employeeUser.password
      })

      const schedule = new Schedule({
        id: item.id,
        vehiclePlate: item.vehiclePlate,
        checkIn: item.checkIn,
        checkOut: item.checkOut,
        pricePerHour: item.pricePerHour.toNumber(),
        priceTotal: item.priceTotal?.toNumber(),
        finished: item.finished
      });
      schedule.addCustomer(car);
      schedule.addVacancy(vacancy);
      schedule.addEmployeeUser(employeeUser)
      return schedule;
    });
  }

  async save(schedule: Schedule): Promise<void> {
    try {
      const { id, vehiclePlate, checkIn, checkOut, pricePerHour, finished, vacancy, customer, employeeUser } = schedule.getState();
      await this.database.getConnection().schedule.create({
        data: {
          id,
          vehiclePlate,
          checkIn,
          checkOut,
          pricePerHour,
          finished,
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
          employeeUser: {
            connectOrCreate: {
              where: {
                id: employeeUser.getState().id
              },
              create: {
                id: employeeUser.getState().id,
                name: employeeUser.getState().name,
                rg: employeeUser.getState().rg,
                email: employeeUser.getState().email,
                password: employeeUser.getState().password
              }
            }
          }
        },
        include: {
          vacancy: true,
          customer: true,
          employeeUser: true
        },
      });
    } catch (error) { 
      console.log(error)
    }
  }
}
