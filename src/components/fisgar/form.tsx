import Box from '@material-ui/core/Box/Box';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Grid from '@material-ui/core/Grid/Grid';
import Modal from '@material-ui/core/Modal/Modal';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';

import { CommonEnum } from '../../constants';
import { useAppDispatch, useFisgarState } from '../../hooks';
import {
  setFisgarData,
  setFisgarMessage,
  setIsLoading,
} from '../../redux/fisgar';
import AddressInput from '../address-input';
import { fisgarFormSchema, IFisgarData, useStyles } from './fisgar.helpers';
import FisgarUserInfo from './user-info';

const FisgarForm: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { loading, fisgarMessage, mapLayers } = useFisgarState();
  const [modalOpen, setModalOpen] = useState(false);
  const handleMessageClose = () => dispatch(setFisgarMessage(null));

  const handlerFisgarFormSubmit = (data: IFisgarData) => {
    if (loading) return;
    dispatch(setIsLoading(true));

    // AN API CALL HERE
    setTimeout(() => {
      console.log(data, mapLayers);
      dispatch(setFisgarData(data));
      dispatch(setIsLoading(false));
      setModalOpen(true);
    }, 2000);
  };

  const { handleSubmit, values, errors, setValues, handleChange, touched } =
    useFormik<IFisgarData>({
      initialValues: {
        name: '',
        email: '',
        cpf: '',
        message: '',
        country: '',
        city: '',
        state: '',
        district: '',
        street: '',
        address: null,
      },
      validationSchema: fisgarFormSchema,
      onSubmit: handlerFisgarFormSubmit,
    });

  const onChangeAddress = (place: google.maps.GeocoderResult | null) => {
    const newPlace = {
      address: place,
      country:
        place?.address_components[place?.address_components.length - 1]
          .long_name || '',
      city:
        place && place?.address_components[place?.address_components.length - 2]
          ? place.address_components[place?.address_components.length - 2]
              .long_name
          : '',
      state:
        place && place?.address_components[place?.address_components.length - 3]
          ? place.address_components[place?.address_components.length - 3]
              .short_name
          : '',
      district:
        place && place?.address_components[place?.address_components.length - 4]
          ? place.address_components[place?.address_components.length - 4]
              .long_name
          : '',
      street:
        place && place?.address_components[place?.address_components.length - 5]
          ? place.address_components[place?.address_components.length - 5]
              .long_name
          : '',
    };

    dispatch(
      setFisgarData({
        ...newPlace,
        marker: place
          ? {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }
          : undefined,
      }),
    );
    setValues({ ...values, ...newPlace });
  };

  return (
    <div>
      <Typography className={classes.title} align="center" variant="h5">
        Fisgar Imóveis
      </Typography>

      <form onSubmit={handleSubmit}>
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
              onChangeSelectedPlace={onChangeAddress}
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
      <Modal
        open={modalOpen}
        className={classes.modalContainer}
        onClose={() => setModalOpen(false)}
      >
        <div className={classes.modalBody}>
          <FisgarUserInfo />
        </div>
      </Modal>
    </div>
  );
};

export default FisgarForm;
