/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import Box from '@material-ui/core/Box/Box';
import Alert from '@material-ui/lab/Alert';
import { LatLngTuple } from 'leaflet';
import React, { FC, useEffect, useState } from 'react';
import {
  FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { ILayer, LayerType } from '../../../constants';
import { useAppDispatch, useFisgarState } from '../../../hooks';
import { setMapLayers } from '../../../redux/fisgar';
import { useStyles } from '../fisgar.helpers';
import FisgarUserInfo from '../user-info';
import { MapChangeView, MapChangeViewOnClick } from './map.helpers';

const FisgarMap: FC = () => {
  const classes = useStyles();
  const [coordinates, setCoordinates] = useState<LatLngTuple | null>(null);
  const { fisgarData, mapLayers } = useFisgarState();
  const dispatch = useAppDispatch();

  const onEditLayer = ({ layers: { _layers } }: any) => {
    Object.values(_layers).forEach(
      ({ layerType, _leaflet_id, editing }: any) => {
        dispatch(
          setMapLayers([
            {
              id: _leaflet_id,
              layerType,
              latLngs: editing.latlngs[0],
              latLng: editing._latlng,
              radius: editing._mRadius,
            },
          ]),
        );
      },
    );
  };

  const onDeleteLayer = ({ layers: { _layers } }: any) => {
    Object.values(_layers).forEach(({ _leaflet_id }: any) => {
      const newLayers = mapLayers.filter(l => l.id !== _leaflet_id);
      dispatch(setMapLayers(newLayers));
    });
  };

  const onCreateLayer = ({ layer, layerType }: any) => {
    let newLayer: ILayer = {
      id: layer._leaflet_id,
      layerType,
    };

    if (layerType === LayerType.Circle)
      newLayer = {
        ...newLayer,
        latLng: layer._latlng,
        radius: layer._mRadius,
      };
    else newLayer = { ...newLayer, latLngs: layer.getLatLngs()[0] };
    dispatch(setMapLayers([newLayer]));
  };

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
      <MapContainer zoom={10} center={coordinates} className={classes.map}>
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

        <FeatureGroup>
          <EditControl
            position="topright"
            onEdited={onEditLayer}
            onCreated={onCreateLayer}
            onDeleted={onDeleteLayer}
            draw={{
              rectangle: true,
              polygon: true,
              circle: true,
              polyline: false,
              marker: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </Box>
  );
};

export default FisgarMap;
