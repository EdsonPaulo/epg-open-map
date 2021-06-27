import { LatLngTuple } from 'leaflet';
import React, { FC } from 'react';
import { useMap, useMapEvent } from 'react-leaflet';

export const MapChangeView: FC<{
  coords: LatLngTuple;
}> = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 10, { animate: true });
  return null;
};

export const MapChangeViewOnClick: FC = () => {
  const map = useMapEvent('click', e => {
    map.setView(e.latlng, map.getZoom(), { animate: true });
  });
  return null;
};
