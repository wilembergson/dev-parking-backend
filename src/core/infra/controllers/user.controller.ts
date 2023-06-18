import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { GetUser, UpdateUser } from '@domain/use-cases/user';
import { EmployeeUser } from '@domain/entities';
import { UserDependencies } from 'src/ioc/user';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserDependencies.UpdateUser)
    private readonly updateUserService: UpdateUser,
    @Inject(UserDependencies.GetUser)
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
