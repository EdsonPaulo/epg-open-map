import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Grid from '@material-ui/core/Grid/Grid';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import TextField from '@material-ui/core/TextField/TextField';
import { useFormik } from 'formik';
import React, { FC } from 'react';

import { CommonEnum } from '../../constants';
import { useAppDispatch, useFisgarState } from '../../hooks';
import {
  setFisgarData,
  setFisgarMessage,
  setIsLoading,
} from '../../redux/fisgar';
import AddressInput from '../address-input';
import { fisgarFormSchema, IFisgarData, useStyles } from './fisgar.helpers';

const FisgarForm: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { loading, fisgarMessage } = useFisgarState();

  const handleMessageClose = () => dispatch(setFisgarMessage(null));

  const handlerFisgarFormSubmit = (data: IFisgarData) => {
    if (loading) return;
    dispatch(setIsLoading(true));

    // AN API CALL HERE
    setTimeout(() => {
      dispatch(setFisgarData(data));
      dispatch(setIsLoading(false));
    }, 2000);
  };

  const { handleSubmit, values, errors, setValues, handleChange, touched } =
    useFormik<IFisgarData>({
      initialValues: {
        name: '',
        email: '',
        cpf: '',
        message: '',
        address: null,
      },
      validationSchema: fisgarFormSchema,
      onSubmit: handlerFisgarFormSubmit,
    });

  const onCHangeAddress = (place: google.maps.GeocoderResult | null) => {
    dispatch(setFisgarData({ address: place }));
    setValues({ ...values, address: place });
  };

  return (
    <div>
      <Typography className={classes.title} align="center" variant="h5">
        Fisgar Imóveis
      </Typography>

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
              onChangeSelectedPlace={onCHangeAddress}
              customRenderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  variant="filled"
                  id={CommonEnum.Address}
                  name={CommonEnum.Address}
                  value={values?.address?.formatted_address ?? null}
                  label="Selecione o endereço"
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
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
        </Grid>

        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Button
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            disabled={loading}
            className={classes.submitButton}
          >
            Submeter
          </Button>

          {loading && <CircularProgress color="primary" />}
        </Box>
      </form>

      <Snackbar
        open={!!fisgarMessage}
        onClose={handleMessageClose}
        message={fisgarMessage?.message}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      />
    </div>
  );
};

export default FisgarForm;
