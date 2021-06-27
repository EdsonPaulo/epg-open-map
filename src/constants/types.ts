import { LatLngLiteral } from 'leaflet';

export enum LayerType {
  Circle = 'circle',
  Polygon = 'polygon',
  Rectangle = 'rectangle',
}

export interface ILayer {
  id: string;
  layerType: LayerType;
  radius?: number;
  latLng?: LatLngLiteral;
  latLngs?: LatLngLiteral[];
}
