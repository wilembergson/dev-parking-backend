import { CreateUser } from '@domain/use-cases/user';
import { Body, Controller, Get, HttpCode, Inject, Post, Res } from '@nestjs/common';
import { Login } from '@domain/use-cases/auth';
import { AuthDependencies } from 'src/ioc/auth';
import { LoginDTO, SignupDTO } from './dto/auth';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthDependencies.CreateEmployeeUser)
    private readonly createUserService: CreateUser,
    @Inject(AuthDependencies.EmployeeLogin)
    private readonly loginService: Login
  ) { }

  @Post('signup')
  async signup(@Body() body: SignupDTO): Promise<void> {
    return this.createUserService.execute({
      name: body.name,
      rg: body.rg,
      email: body.email,
      password: body.password,
    });
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDTO): Promise<any> {
    return this.loginService.execute({
      email: body.email,
      password: body.password
    })
  }

  @Get('valid-token')
  async validToken(@Res() res: Response): Promise<any> {
    const { id, name } = res.locals.employeeData
    res.status(200).send({ id, name })
  }
}
