import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsersDto } from 'src/resources/users/dto/login-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginUsersDto) {
    return await this.authService.signIn(loginDto);
  }
}
