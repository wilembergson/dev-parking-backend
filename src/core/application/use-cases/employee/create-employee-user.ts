import { Hasher } from '@application/protocols/cryptografy';
import { EmployeeUser } from '@domain/entities';
import { UserFound } from '@domain/exceptions';
import { EmployeeUserRepository } from '@domain/repositories';
import { CreateUser } from '@domain/use-cases/user'

export class CreateEmployeeUserUseCase implements CreateUser {
  constructor(
    private readonly userRepository: EmployeeUserRepository,
    private readonly hasher: Hasher
  ) { }

  async execute(input: CreateUser.Input): Promise<void> {
    const foundUser = await this.userRepository.findOne({ email: input.email, rg: input.rg });
    if (foundUser) throw new UserFound();
    const password = await this.hasher.hash(input.password)
    const user = new EmployeeUser({
      name: input.name,
      rg: input.rg,
      email: input.email,
      password,
    });
    await this.userRepository.save(user);
  }
}