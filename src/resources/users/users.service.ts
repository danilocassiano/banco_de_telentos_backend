import {
  ConflictException,
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private hashPassword(password: string): string {
    return bcryptHashSync(password, 10);
  }

  async create(newUser: CreateUserDto): Promise<User> {
    const { codigoDepartamento, ...user } = newUser;
    const existingUser = await this.prisma.user.findUnique({
      where: { email: newUser.email },
    });

    if (existingUser) {
      throw new ConflictException(
        `Usuário com o e-mail ${newUser.email} já existe.`,
      );
    }

    return this.prisma.user.create({
      data: {
        ...user,
        Departamento: {
          connect: {
            descricao: codigoDepartamento,
          },
        },
        password: this.hashPassword(newUser.password),
      },
    });
  }

  async findOne(id: number, hidePassword = true): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      throw new NotFoundException(`Usuário com ID '${id}' não encontrado.`);

    if (hidePassword) delete user.password;
    return user;
  }

  async update(id: number, body: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.prisma.user.findUnique({ where: { id } });

    if (!userToUpdate) {
      throw new NotFoundException(`Usuário com ID '${id}' não encontrado.`);
    }

    if (body.password) {
      body.password = this.hashPassword(body.password);
    }

    if (body.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: body.email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(
          `Usuário com o e-mail ${body.email} já existe.`,
        );
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: body,
    });

    delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id); // Validação de existência
    await this.prisma.user.delete({ where: { id } });
  }

  async findAll(page = 1, limit = 10): Promise<Partial<User>[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException(
        'Página e limite devem ser valores positivos.',
      );
    }

    const skip = (page - 1) * limit;
    const users = await this.prisma.user.findMany({ skip, take: limit });

    return users.map((user) => {
      delete user.password;

      return user;
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByNome(nome: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { nome } });
  }
}
