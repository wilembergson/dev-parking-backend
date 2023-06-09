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
  Param,
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
  ) { }

  @Post()
  async createUser(@Body() body: any): Promise<void> {
    return this.createUserService.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      age: body.age,
    });
  }

  @Put(':id')
  async updateUser(@Param() param, @Body() body: any): Promise<void> {
    return this.updateUserService.execute(param.id, {
      name: body.name,
      age: body.age,
      email: body.email,
      password: body.password,
    });
  }

  @Delete(':id')
  async deleteUser(@Param() param): Promise<void> {
    return this.deleteUserService.execute({
      id: param.id,
    });
  }

  @Get(':id')
  async getUser(@Param() param): Promise<User | null> {
    return this.getUserService.execute({ id: param.id });
  }
}
