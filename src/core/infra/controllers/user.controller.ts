import { CreateUser } from '@application/use-cases';
import { faker } from '@faker-js/faker';
import { Controller, Inject, Post } from '@nestjs/common';
import { UserDependencies } from '../../../ioc/user';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserDependencies.CreateUser)
    private readonly createUserService: CreateUser,
  ) {}

  @Post()
  async createUser(): Promise<void> {
    return this.createUserService.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      age: faker.datatype.number(),
    });
  }
}
