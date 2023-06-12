import { CreateUser } from '@domain/use-cases/user';
import { Body, Controller, HttpCode, Inject, Post} from '@nestjs/common';
import { Login } from '@domain/use-cases/auth';
import { AuthDependencies } from 'src/ioc/auth';
import { LoginDTO, SignupDTO } from './dto/auth';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthDependencies.CreateUser) 
    private readonly createUserService: CreateUser,
    @Inject(AuthDependencies.Login)
    private readonly loginService: Login
  ) { }

  @Post('signup')
  async signup(@Body() body: SignupDTO): Promise<void> {
    return this.createUserService.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      birthdate: body.birthdate,
    });
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body:LoginDTO): Promise<any>{
    return this.loginService.execute({
      email: body.email,
      password: body.password
    })
  }
}
