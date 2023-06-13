import { EmployeeUser } from '@domain/entities';
import { UserNotFound } from '@domain/exceptions';
import { EmployeeUserRepository } from '@domain/repositories';
import { GetUser } from '@domain/use-cases/user';

export class EmployeeGetUser implements GetUser{
  constructor(private readonly userRepository: EmployeeUserRepository) { }
 
  async execute(input: GetUser.Input.FindOne): Promise<EmployeeUser> {
    const user = await this.userRepository.findOne({ id: input.id });
    if (!user) throw new UserNotFound();
    return user;
  }
}

