import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { PrismaClient } from '@prisma/client';
import { Database } from '../database';

export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly database: Database<PrismaClient>) { }

  async delete(input: UserRepository.Input.Delete): Promise<void> {
    await this.database.getConnection().user.delete({
      where: {
        id: input.id,
      },
    });
  }

  async update(input: UserRepository.Input.Update): Promise<void> {
    await this.database.getConnection().user.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        email: input.email,
        password: input.password,
        birthdate: input.birthdate,
      },
    });
  }

  async findOne(input: UserRepository.Input.FindOne): Promise<User | null> {
    const data = await this.database.getConnection().user.findFirst({
      where: {
        OR: [
          {
            email: input.email,
          },
          {
            id: input.id,
          },
        ],
      },
    });
    if (!data) return null;
    return new User({
      name: data.name,
      email: data.email,
      password: data.password,
      birthdate: data.birthdate,
      id: data.id,
    });
  }

  async save(user: User): Promise<void> {
    const { id, name, email, password, birthdate } = user.getState();
    await this.database.getConnection().user.upsert({
      where: { id },
      create: { id, name, email, password, birthdate },
      update: { name, email, password, birthdate },
    });
  }
}
