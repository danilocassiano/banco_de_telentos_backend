import { ValidationArguments } from 'class-validator';

const message = {
  maxLength:
    (len: number) =>
    ({ property }: ValidationArguments) =>
      `O campo ${property} deve ter no máximo ${len} caracteres`,

  minLength:
    (len: number) =>
    ({ property }: ValidationArguments) =>
      `O campo ${property} deve ter no mínimo ${len} caracteres`,

  isEmail: ({ property }: ValidationArguments) =>
    `O campo ${property} deve ser um e-mail válido`,

  isBoolean: ({ property }: ValidationArguments) =>
    `O campo ${property} deve ser um booleano`,

  isNumber: ({ property }: ValidationArguments) =>
    `O campo ${property} deve ser um número`,

  isString: ({ property }: ValidationArguments) =>
    `O campo ${property} deve ser uma string`,

  isEmpty: ({ property }: ValidationArguments) =>
    `O campo ${property} é obrigatório`,

  isPhone: ({ property }: ValidationArguments) =>
    `O campo ${property} deve ser um telefone válido`,

  isDate: ({ property }: ValidationArguments) =>
    `O campo ${property} deve ser uma data`,

  isIn:
    (values: any[]) =>
    ({ property }: ValidationArguments) =>
      `O campo ${property} deve ser ${values.slice(0, -1).join(', ') + ' ou ' + values.slice(-1)}`,
};

export default message;