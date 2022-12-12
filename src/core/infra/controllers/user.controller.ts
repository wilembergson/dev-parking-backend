import { CreateUser, UpdateUser } from '@application/use-cases';
import { DeleteUser } from '@application/use-cases/delete-user';
import { GetUser } from '@application/use-cases/get-user';
import { User } from '@domain/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
} from '@nestjs/common';
import { UserDependencies } from '../../../ioc/user';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserDependencies.CreateUser)
    private readonly createUserService: CreateUser,
    @Inject(UserDependencies.UpdateUser)
    private readonly updateUserService: UpdateUser,
    @Inject(UserDependencies.DeleteUser)
    private readonly deleteUserService: DeleteUser,
    @Inject(UserDependencies.GetUser)
    private readonly getUserService: GetUser,
  ) {}

  @Post()
  async createUser(@Body() body: any): Promise<void> {
    return this.createUserService.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      age: body.age,
    });
  }

  @Put()
  async updateUser(@Body() body: any): Promise<void> {
    return await this.updateUserService.execute({
      id: body.id,
      name: body.name,
      age: body.age,
      email: body.email,
      password: body.password,
    });
  }

  @Delete()
  async deleteUser(@Body() body: any): Promise<void> {
    await this.deleteUserService.execute({
      email: body.email,
    });
  }

  @Get()
  async getUser(@Body() body: any): Promise<User | null> {
    return await this.getUserService.execute({ email: body.email });
  }
}
