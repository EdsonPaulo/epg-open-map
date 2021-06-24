import { makeStyles } from '@material-ui/core/styles';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import { ReactElement } from 'react';

export type AddressInputProps = {
  onChangeSelectedPlace(place: google.maps.GeocoderResult | null): void;
  customRenderInput(params: AutocompleteRenderInputParams): ReactElement;
};

export const loadScript = (
  src: string,
  position: HTMLElement | null,
  id: string,
) => {
  if (!position) return;

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
};

export const geocodeByPlaceId = (
  placeId: string,
): Promise<google.maps.GeocoderResult[]> => {
  const geocoder = new window.google.maps.Geocoder();
  const { OK } = window.google.maps.GeocoderStatus;

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { placeId },
      (
        results: google.maps.GeocoderResult[] | null,
        status: google.maps.GeocoderStatus,
      ) => {
        if (status !== OK) return reject(status);
        return resolve(results || []);
      },
    );
  });
};

export const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));
