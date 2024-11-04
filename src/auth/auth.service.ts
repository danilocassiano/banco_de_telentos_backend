import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { LoginUsersDto } from '../resources/users/dto/login-users.dto';
import { UsersService } from '../resources/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(
    loginDto: LoginUsersDto,
  ): Promise<{ token: string; user: User }> {
    const { username, password } = loginDto;

    // Buscar o usuário pelo email ou nome
    const foundUser = await this.prismaService.user.findFirst({
      include: {
        Departamento: true,
      },
      where: {
        OR: [
          {
            email: username,
          },
          {
            nome: username,
          },
        ],
      },
    });

    if (!foundUser || !bcryptCompareSync(password, foundUser.password))
      throw new UnauthorizedException('Credenciais inválidas');

    const payload = { id: foundUser.id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: `${this.jwtExpirationTimeInSeconds}s`,
    });

    return { token, user: foundUser };
  }
}
