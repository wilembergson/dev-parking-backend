import { PrismaClient } from '@prisma/client';
import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { Database } from '../database';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly database: Database<PrismaClient>) {}

  async findOne(input: UserRepository.Input.FindOne): Promise<User | null> {
    const data = await this.database.getConnection().user.findFirst({
      where: { email: input.email },
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
    await this.database.getConnection().user.create({
      data: { id, name, email, password, age },
    });
  }
}
