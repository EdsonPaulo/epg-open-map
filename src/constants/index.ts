export enum CommonEnum {
  Name = 'name',
  Email = 'email',
  CPF = 'cpf',
  Address = 'address',
  Message = 'message',
  Country = 'country',
  City = 'city',
  State = 'state',
  Street = 'street',
  District = 'district',
  Fisgar = 'fisgar',
}

export enum FormValidationMessages {
  Required = 'Este campo é obrigatório!',
  IsShort = 'Demasiado curto',
  IsLong = 'Demasiado longo',
  InvalidEmail = 'E-mail inválido',
  OnlyCharacters = 'Deve conter somente letras',
  OnlyNumbers = 'Deve conter somente números',
}

export const RgxOnlyCharacters = /[a-zA-Z\u00C0-\u00FF ]+/i;

export * from './types';
