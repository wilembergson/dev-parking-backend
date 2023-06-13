import { Customer } from '@domain/entities';
import { Database } from 'src/core/infra/database';
import { PrismaClient } from '@prisma/client';
import { CustomerRepository } from '@domain/repositories';

export class CustomerRepositoryPrisma implements CustomerRepository {
  constructor(private readonly database: Database<PrismaClient>) { }

  /*async listCars(): Promise<Car[] | null> {
    return await this.database.getConnection().car.findMany();
  }*/

  async delete(input: CustomerRepository.Input.FindOne): Promise<void> {
    await this.database.getConnection().customer.delete({
      where: {
        id: input.id,
      },
    });
  }

  async findOne(input: CustomerRepository.Input.FindOne): Promise<Customer | null> {
    const data = await this.database.getConnection().customer.findFirst({
      where: {
        OR: [
          {
            id: input.id,
          },
          {
            rg: input.rg,
          },
        ],
      },
    });
    if (!data) return null;
    return new Customer({
      name: data.name,
      rg: data.rg
    });
  }

  async save(customer: Customer): Promise<void> {
    const { id, name, rg } = customer.getState();
    await this.database.getConnection().customer.create({
      data: { id, name, rg },
    });
  }
}
