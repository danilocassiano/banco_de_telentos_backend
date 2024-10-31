import { IsEmail, IsNotEmpty, Length, ValidateIf } from 'class-validator';
import message from 'src/validator/message.validator';

export class LoginUsersDto {
  @ValidateIf((o) => !o.email)
  @IsNotEmpty({ message: message.isEmpty })
  email?: string;

  @ValidateIf((o) => !o.nome)
  @IsEmail({}, { message: message.isEmail })
  @IsNotEmpty({ message: message.isEmpty })
  nome?: string;

  @IsNotEmpty({ message: message.isEmpty })
  @Length(6, 120, { message: message.minLength(6) })
  @Length(0, 20, { message: message.maxLength(20) })
  password: string;
}