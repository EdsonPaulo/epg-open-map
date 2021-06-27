import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as Yup from 'yup';

import {
  CommonEnum,
  FormValidationMessages,
  RgxOnlyCharacters,
} from '../../constants';

export interface IFisgarData {
  [CommonEnum.Name]: string;
  [CommonEnum.Email]: string;
  [CommonEnum.CPF]: string;
  [CommonEnum.Address]: google.maps.GeocoderResult | null;
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

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { flex: 1, minHeight: '100vh' },
    formContainer: {
      padding: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > div': {
        maxWidth: '600px',
      },
    },
    map: {
      width: 'inherit',
      height: 'inherit',
      position: 'relative',
    },
    submitButton: { marginBottom: theme.spacing(2) },
    title: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: theme.spacing(5),
    },
  }),
);
