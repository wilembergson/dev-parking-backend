import { EmployeeGetUser, UpdateUser } from '@application/use-cases';
import { DeleteUser } from '@application/use-cases/delete-user';
import { EmployeeUser } from '@domain/entities';
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
import { CreateUser } from '@domain/use-cases/user';

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
    private readonly getUserService: EmployeeGetUser,
  ) { }

  @Post()
  async createUser(@Body() body: any): Promise<void> {
    return this.createUserService.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      rg: body.birthdate,
    });
  }

  @Put(':id')
  async updateUser(@Param() param, @Body() body: any): Promise<void> {
    return this.updateUserService.execute(param.id, {
      name: body.name,
      rg: body.birthdate,
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
  async getUser(@Param() param): Promise<EmployeeUser | null> {
    return this.getUserService.execute({ id: param.id });
  }
}
