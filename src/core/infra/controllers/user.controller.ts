import { Body, Controller, Delete, Get, Inject, Param, Put } from '@nestjs/common';
import { EmployeeUser } from '@domain/entities';
import { UpdateUser } from '@domain/use-cases/user';
import { UserDependencies } from '../../../ioc/user';
import { EmployeeGetUser, } from '@application/use-cases';
import { DeleteUser } from '@application/use-cases/delete-user';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserDependencies.UpdateUser)
    private readonly updateUserService: UpdateUser,
    @Inject(UserDependencies.DeleteUser)
    private readonly deleteUserService: DeleteUser,
    @Inject(UserDependencies.GetUser)
    private readonly getUserService: EmployeeGetUser,
  ) { }

  @Put(':id')
  async updateUser(@Param() param, @Body() body: any): Promise<void> {
    return this.updateUserService.execute(param.id, {
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
