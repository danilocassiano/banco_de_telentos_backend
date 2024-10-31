import {
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';


@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(newUser: CreateUserDto): Promise<User> {
        const hashPassword = bcryptHashSync(newUser.password, 10);

        const existingUser = await this.prisma.user.findUnique({
            where: { email: newUser.email },
        });

        if (existingUser) {
            throw new ConflictException(
                `Usuário com o e-mail ${newUser.email} já existe.`,
            );
        }

        return await this.prisma.user.create({
            data: {
                ...newUser,
                password: hashPassword,
            },
        });
    }

    async findOne(id: number, deletaSenha: boolean = true): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user)
            throw new HttpException(
                `Usuario com '${id}' não foi encontrado.`,
                HttpStatus.NOT_FOUND,
            );

        deletaSenha && delete user.password;

        return user;
    }

    async update(id: number, body: UpdateUserDto): Promise<User> {
        const userUpdate = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!userUpdate) {
            throw new HttpException(
                `Usuário com código '${id}' não encontrado.`,
                HttpStatus.NOT_FOUND,
            );
        }

        if (body.password) {
            body.password = bcryptHashSync(body.password, 10);
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
        const userCheck = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!userCheck)
            throw new HttpException(
                `Usuário com código '${id}' não encontrado.`,
                HttpStatus.NOT_FOUND,
            );

        await this.prisma.user.delete({
            where: { id },
        });
    }

    async findAll(page: number, limit: number): Promise<User[]> {
        if (page < 1 || limit < 1) {
            throw new HttpException(
                'A Pagina ou Limite precisa ser positivo.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const skip = (page - 1) * limit;

        const users = await this.prisma.user.findMany({
            skip,
            take: limit,
        });

        return users;
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async findByNome(nome: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
          where: {
            nome: nome,
          },
        });
      }
}