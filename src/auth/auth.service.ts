
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { LoginUsersDto } from '../resources/users/dto/login-users.dto';
import { UsersService } from '../resources/users/users.service';


@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(
    loginDto: LoginUsersDto,
  ): Promise<{ token: string; expiresIn: number }> {
    const { nome, email, password } = loginDto;
  
    // Buscar o usuário pelo email ou nome
    const foundUser = email 
      ? await this.usersService.findByEmail(email)
      : await this.usersService.findByNome(nome);
  
    if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  
    const payload = { sub: foundUser.id, email: foundUser.email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: `${this.jwtExpirationTimeInSeconds}s`,
    });
  
    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
