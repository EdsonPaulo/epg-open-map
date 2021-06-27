import Box from '@material-ui/core/Box/Box';
import Alert from '@material-ui/lab/Alert';
import { LatLngTuple } from 'leaflet';
import React, { FC, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import useFisgarState from '../../../hooks/use-fisgar-state';
import { useStyles } from '../fisgar.helpers';
import {
  FisgarUserInfo,
  MapChangeView,
  MapChangeViewOnClick,
} from './map.helpers';

const FisgarMap: FC = () => {
  const classes = useStyles();
  const [coordinates, setCoordinates] = useState<LatLngTuple | null>(null);
  const { fisgarData } = useFisgarState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates([latitude, longitude]);
      },
    );
  }, []);

  useEffect(() => {
    if (fisgarData?.address) {
      setCoordinates([
        fisgarData.address.geometry.location.lat(),
        fisgarData.address.geometry.location.lng(),
      ]);
    }
  }, [fisgarData]);

  if (!coordinates)
    return (
      <Alert severity="warning">Não conseguimos obter uma localização!</Alert>
    );

  return (
    <Box minHeight="100vh" height="100%" width="100%">
      <MapContainer
        fadeAnimation
        zoom={20}
        center={coordinates}
        className={classes.map}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates}>
          <Popup>
            <FisgarUserInfo />
          </Popup>
        </Marker>

        <MapChangeView coords={coordinates} />
        <MapChangeViewOnClick />
      </MapContainer>
    </Box>
  );
};

export default FisgarMap;
