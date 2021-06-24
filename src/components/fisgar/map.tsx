import Button from '@material-ui/core/Button/Button';
import Alert from '@material-ui/lab/Alert';
import { LatLngTuple } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { ICoordinates, useStyles } from './fisgar.helpers';

const FisgarMap: React.FC = () => {
  const classes = useStyles();
  const [coordinates, setCoordinates] = useState<ICoordinates | null>();

  const getLocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        // console.log(currentPosition);
        setCoordinates({
          lat: latitude,
          lng: longitude,
          zoom: 13,
        });
      },
    );
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  if (!coordinates)
    return (
      <Alert
        severity="warning"
        action={
          <Button color="inherit" size="small" onClick={getLocationPermission}>
            Permitir
          </Button>
        }
      >
        Dê permissão de geolocalização no seu navegador!
      </Alert>
    );

  const position = [coordinates.lat, coordinates.lng] as LatLngTuple;

  return (
    <div style={{ width: '400px', height: '100%', position: 'relative' }}>
      <div style={{ width: '200px', height: '200px', position: 'relative' }}>
        <MapContainer
          center={position}
          zoom={coordinates.zoom || 13}
          style={{ width: 'inherit', height: 'inherit', position: 'relative' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default FisgarMap;
