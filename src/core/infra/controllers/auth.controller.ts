import { CreateUser } from '@application/use-cases';
import { UserDependencies } from '../../../ioc/user';
import { Body, Controller, Inject, Post} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UserDependencies.CreateUser) 
    private readonly createUserService: CreateUser,
  ) { }

  @Post('signup')
  async signup(@Body() body: any): Promise<void> {
    return this.createUserService.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      birthdate: body.birthdate,
    });
  }

}
