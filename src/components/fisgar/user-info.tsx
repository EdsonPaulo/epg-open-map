import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography/Typography';
import React, { FC } from 'react';

import { useFisgarState } from '../../hooks';

const FisgarUserInfo: FC = () => {
  const { fisgarData } = useFisgarState();

  return (
    <Box>
      {fisgarData?.name && (
        <Typography>
          Nome:
          <b> {fisgarData.name}</b>
        </Typography>
      )}
      {fisgarData?.email && (
        <Typography>
          Email:
          <b> {fisgarData.email}</b>
        </Typography>
      )}

      {fisgarData?.address && (
        <Box>
          <Typography>
            Endereço:
            <b> {fisgarData.address.formatted_address} </b>
          </Typography>
          <Typography>
            Lat:
            <b> {fisgarData.address.geometry.location.lat()} </b>
            Lng:
            <b> {fisgarData.address.geometry.location.lng()} </b>
          </Typography>
        </Box>
      )}
      {fisgarData?.cpf && (
        <Typography>
          CPF:
          <b> {fisgarData.cpf}</b>
        </Typography>
      )}
      {fisgarData?.country && (
        <Typography>
          País:
          <b> {fisgarData.country}</b>
        </Typography>
      )}
      {fisgarData?.city && (
        <Typography>
          Cidade:
          <b> {fisgarData.city}</b>
        </Typography>
      )}
      {fisgarData?.state && (
        <Typography>
          Estado:
          <b> {fisgarData.state}</b>
        </Typography>
      )}
      {fisgarData?.district && (
        <Typography>
          Distrito:
          <b> {fisgarData.district}</b>
        </Typography>
      )}
      {fisgarData?.street && (
        <Typography>
          Rua:
          <b> {fisgarData.street}</b>
        </Typography>
      )}
      {fisgarData?.message && (
        <Typography>
          Mensagem:
          <b> {fisgarData.message}</b>
        </Typography>
      )}
    </Box>
  );
};

export default FisgarUserInfo;
