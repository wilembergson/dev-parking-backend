import { UserNotFound } from '@domain/exceptions';
import { EmployeeUserRepository } from '@domain/repositories';
import { GetUser } from '@domain/use-cases/user';

export class EmployeeGetUser implements GetUser{
  constructor(private readonly userRepository: EmployeeUserRepository) { }
 
  async execute(input: GetUser.Input): Promise<GetUser.Output> {
    const user = await this.userRepository.findOne({ id: input.id });
    if (!user) throw new UserNotFound();
    return user.getInformations();
  }
}