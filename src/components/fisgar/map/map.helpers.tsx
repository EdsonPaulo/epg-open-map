import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography/Typography';
import { LatLngTuple } from 'leaflet';
import React, { FC } from 'react';
import { useMap, useMapEvent } from 'react-leaflet';

import { useFisgarState } from '../../../hooks';

export const MapChangeView: FC<{
  coords: LatLngTuple;
}> = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 20, { animate: true });
  return null;
};

export const MapChangeViewOnClick: FC = () => {
  const map = useMapEvent('click', e => {
    map.setView(e.latlng, map.getZoom(), { animate: true });
  });
  return null;
};

export const FisgarUserInfo: FC = () => {
  const { fisgarData } = useFisgarState();

  return (
    <Box>
      {fisgarData?.name && (
        <Typography>
          Nome:
          <b>{fisgarData.name}</b>
        </Typography>
      )}
      {fisgarData?.email && (
        <Typography>
          Email:
          <b>{fisgarData.email}</b>
        </Typography>
      )}
      {fisgarData?.cpf && (
        <Typography>
          CPF:
          <b>{fisgarData.cpf}</b>
        </Typography>
      )}
      {fisgarData?.message && (
        <Typography>
          Mensagem:
          <b>{fisgarData.message}</b>
        </Typography>
      )}
    </Box>
  );
};
