import { UserNotFound } from '@domain/exceptions';
import { UpdateUser } from '@domain/use-cases/user';
import { Hasher } from '@application/protocols/cryptografy';
import { EmployeeUserRepository } from '@domain/repositories';

export class UpdateEmployeeUser implements UpdateUser {
  constructor(
    private readonly employeeUserRepository: EmployeeUserRepository,
    private readonly hasher: Hasher
  ) { }

  async execute(id: string, input: UpdateUser.Input): Promise<void> {
    const user = await this.employeeUserRepository.findOne({ id });
    if (!user) throw new UserNotFound();
    const { email, password } = input
    if (password) {
      const hashedPassword = await this.hasher.hash(password)
      user.update({
        email,
        password: hashedPassword
      })
    } else {
      user.update(input)
    }
    await this.employeeUserRepository.save(user);
  }
}