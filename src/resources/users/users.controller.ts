import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(+id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }

  @Get('')
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new HttpException(
        'O parâmetro "page" deve ser um número positivo.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
      throw new HttpException(
        'O parâmetro "limit" deve ser um número positivo.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.usersService.findAll(pageNumber, limitNumber);
  }
}
