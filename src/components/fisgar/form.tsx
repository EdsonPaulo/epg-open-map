import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';

import { CommonEnum } from '../../constants';
import AddressInput from '../address-input';
import { fisgarFormSchema, IFisgarForm } from './fisgar.types';

const FisgarForm: FC = () => {
  const [submiting, setSubmitting] = useState(false);

  const handlerFisgarFormSubmit = (data: IFisgarForm) => {
    if (submiting) return;

    setTimeout(() => {
      console.log(data);
      setSubmitting(false);
    }, 1000);
  };

  const { handleSubmit, values, errors, setValues, handleChange, touched } =
    useFormik<IFisgarForm>({
      initialValues: {
        name: '',
        email: '',
        cpf: '',
        fullAddress: null,
        message: '',
      },
      validationSchema: fisgarFormSchema,
      onSubmit: handlerFisgarFormSubmit,
    });

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              id={CommonEnum.Name}
              name={CommonEnum.Name}
              label="Nome"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              id={CommonEnum.Email}
              name={CommonEnum.Email}
              label="Email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              id={CommonEnum.CPF}
              name={CommonEnum.CPF}
              label="CPF"
              value={values.cpf}
              onChange={handleChange}
              error={touched.cpf && Boolean(errors.cpf)}
              helperText={touched.cpf && errors.cpf}
            />
          </Grid>

          <Grid item xs={12}>
            <AddressInput
              onChangeSelectedPlace={place => {
                console.log(place);
                setValues({ ...values, fullAddress: place });
              }}
              customRenderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  variant="filled"
                  id={CommonEnum.FullAddress}
                  name={CommonEnum.FullAddress}
                  value={values?.fullAddress?.formatted_address ?? null}
                  label="Selecione o endereço"
                  error={touched.fullAddress && Boolean(errors.fullAddress)}
                  helperText={touched.fullAddress && errors.fullAddress}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="filled"
              id={CommonEnum.Message}
              name={CommonEnum.Message}
              label="Sua mensagem"
              value={values.message}
              onChange={handleChange}
              error={touched.message && Boolean(errors.message)}
              helperText={touched.message && errors.message}
            />
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              size="large"
              variant="contained"
              type="submit"
            >
              Submeter
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FisgarForm;
