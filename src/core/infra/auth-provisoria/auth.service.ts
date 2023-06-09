import { GetUser } from '@application/use-cases/get-user';
import { User } from '@domain/entities';
import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly getUser: GetUser) { }

  async validateUser(email: string, password: string) {
    let user: User | null

    try {
      user = await this.getUser.execute({ email })
    } catch (error) {
      return null
    }

    const isPasswordValid = compareSync(password, user!.getState().password)
    if (!isPasswordValid) return null

    return user?.getState
  }
}
