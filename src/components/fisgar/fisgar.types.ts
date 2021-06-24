import * as Yup from 'yup';

import {
  CommonEnum,
  FormValidationMessages,
  RgxOnlyCharacters,
} from '../../constants';

export interface ICoordinates {
  lat: number;
  lng: number;
  zoom: number;
}

export interface IFisgarForm {
  [CommonEnum.Name]: string;
  [CommonEnum.Email]: string;
  [CommonEnum.CPF]: string;
  [CommonEnum.FullAddress]: google.maps.GeocoderResult | null;
  [CommonEnum.Message]: string;
}

export const fisgarFormSchema = Yup.object().shape({
  [CommonEnum.Name]: Yup.string()
    .trim()
    .required(FormValidationMessages.Required)
    .min(7, FormValidationMessages.IsShort)
    .max(50, FormValidationMessages.IsLong)
    .matches(RgxOnlyCharacters, FormValidationMessages.OnlyCharacters),
  [CommonEnum.Email]: Yup.string()
    .trim()
    .required(FormValidationMessages.Required)
    .email(FormValidationMessages.InvalidEmail),
  [CommonEnum.CPF]: Yup.string()
    .trim()
    .required(FormValidationMessages.Required),
  [CommonEnum.FullAddress]: Yup.object()
    .nullable()
    .required(FormValidationMessages.Required),
  [CommonEnum.Message]: Yup.string()
    .trim()
    .required(FormValidationMessages.Required),
});