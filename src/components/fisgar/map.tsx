import Button from '@material-ui/core/Button/Button';
import Alert from '@material-ui/lab/Alert';
import { LatLngTuple } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { ICoordinates } from './fisgar.types';

const FisgarMap: React.FC = () => {
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
    <div>
      <MapContainer
        center={position}
        zoom={coordinates.zoom || 13}
        scrollWheelZoom={false}
        // style={{ width: '100%', height: '100%' }}
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
  );
};

export default FisgarMap;
