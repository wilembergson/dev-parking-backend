import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { GetUser, UpdateUser } from '@domain/use-cases/user';
import { EmployeeUser } from '@domain/entities';
import { EmployeeUserDependencies } from 'src/ioc/employee-user';

@Controller('user')
export class EmployeeUserController {
  constructor(
    @Inject(EmployeeUserDependencies.UpdateUser)
    private readonly updateUserService: UpdateUser,
    @Inject(EmployeeUserDependencies.GetUser)
    private readonly getUserService: GetUser
  ) { }

  @Put(':id')
  async updateUser(@Param() param, @Body() body: any): Promise<void> {
    return this.updateUserService.execute(param.id, {
      email: body.email,
      password: body.password,
    });
  }

  @Get(':id')
  async getUser(@Param() param): Promise<EmployeeUser.Output.getInformations | null> {
    return this.getUserService.execute({ id: param.id });
  }
}
