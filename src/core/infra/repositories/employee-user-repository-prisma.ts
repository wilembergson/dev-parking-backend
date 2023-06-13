import { EmployeeUser } from '@domain/entities';
import { EmployeeUserRepository } from '@domain/repositories';
import { PrismaClient } from '@prisma/client';
import { Database } from '../database';

export class EmployeeUserRepositoryPrisma implements EmployeeUserRepository {
  constructor(private readonly database: Database<PrismaClient>) { }

  async delete(input: EmployeeUserRepository.Input.Delete): Promise<void> {
    await this.database.getConnection().employeeUser.delete({
      where: {
        id: input.id,
      },
    });
  }

  async update(input: EmployeeUserRepository.Input.Update): Promise<void> {
    await this.database.getConnection().employeeUser.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        rg: input.rg,
        email: input.email,
        password: input.password,
      },
    });
  }

  async findOne(input: EmployeeUserRepository.Input.FindOne): Promise<EmployeeUser | null> {
    const data = await this.database.getConnection().employeeUser.findFirst({
      where: {
        OR: [
          {
            email: input.email,
          },
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
    return new EmployeeUser({
      name: data.name,
      email: data.email,
      password: data.password,
      rg: data.rg,
      id: data.id,
    });
  }

  async save(user: EmployeeUser): Promise<void> {
    const { id, name, rg, email, password } = user.getState();
    await this.database.getConnection().employeeUser.upsert({
      where: { id },
      create: { id, name, rg, email, password },
      update: { name, rg, email, password },
    });
  }
}
