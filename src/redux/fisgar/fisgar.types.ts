import { CommonEnum } from '../../constants';

export interface FisgarMessage {
  message: string;
  isError?: false;
}

export interface IFisgarData {
  [CommonEnum.Name]?: string;
  [CommonEnum.Email]?: string;
  [CommonEnum.CPF]?: string;
  [CommonEnum.Address]?: google.maps.GeocoderResult | null;
  [CommonEnum.Message]?: string;
}

export interface FisgarState {
  fisgarData: IFisgarData | null;
  isLoading: boolean;
  fisgarMessage: FisgarMessage | null;
}
