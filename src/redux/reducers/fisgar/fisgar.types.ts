import { CommonEnum } from '../../../constants';

export interface FisgarState {
  [CommonEnum.Name]: string;
  [CommonEnum.Email]: string;
  [CommonEnum.CPF]: string;
  [CommonEnum.Message]: string;
  [CommonEnum.Address]: google.maps.GeocoderResult | null;
}

export interface FisgarAcionPayload {
  [CommonEnum.Name]?: string;
  [CommonEnum.Email]?: string;
  [CommonEnum.CPF]?: string;
  [CommonEnum.Message]?: string;
  [CommonEnum.Address]?: google.maps.GeocoderResult | null;
}
