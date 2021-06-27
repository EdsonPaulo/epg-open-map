import { LatLngLiteral } from 'leaflet';

import { CommonEnum, ILayer } from '../../constants';

export interface FisgarMessage {
  message: string;
  isError?: false;
}

export interface IFisgarDataPayload {
  [CommonEnum.Name]?: string;
  [CommonEnum.Email]?: string;
  [CommonEnum.CPF]?: string;
  [CommonEnum.Address]?: google.maps.GeocoderResult | null;
  [CommonEnum.Message]?: string;
  [CommonEnum.Country]?: string;
  [CommonEnum.City]?: string;
  [CommonEnum.State]?: string;
  [CommonEnum.District]?: string;
  [CommonEnum.Street]?: string;
  marker?: LatLngLiteral;
}

export interface FisgarState {
  fisgarData: IFisgarDataPayload;
  mapLayers: ILayer[];
  isLoading: boolean;
  fisgarMessage: FisgarMessage | null;
}
