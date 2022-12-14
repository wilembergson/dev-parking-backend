import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { PrismaClient } from '@prisma/client';
import { Database } from '../database';

export class UserRepositoryPrisma implements UserRepository {
  // eslint-disable-next-line prettier/prettier
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
        age: input.age,
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
      age: data.age,
      id: data.id,
    });
  }

  async save(user: User): Promise<void> {
    const { id, name, email, password, age } = user.getState();
    await this.database.getConnection().user.upsert({
      where: { id },
      create: { id, name, email, password, age },
      update: { name, email, password, age },
    });
  }
}
