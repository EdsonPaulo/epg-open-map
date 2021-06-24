export enum CommonEnum {
  Name = 'name',
  Email = 'email',
  CPF = 'cpf',
  Address = 'address',
  FullAddress = 'fullAddress',
  Message = 'message',
  City = 'city',
  State = 'state',
  Street = 'street',
  District = 'district',
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
