/* eslint-disable react/no-array-index-key */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import debounce from 'lodash/debounce';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import {
  AddressInputProps,
  geocodeByPlaceId,
  loadScript,
  useStyles,
} from './address-input.helpers';

let autoCompleteService: google.maps.places.AutocompleteService;

const AddressInput: FC<AddressInputProps> = ({
  customRenderInput,
  onChangeSelectedPlace,
}) => {
  const classes = useStyles();
  const loaded = useRef(false);
  const [inputValue, setInputValue] = useState('');

  const [value, setValue] =
    useState<google.maps.places.AutocompletePrediction | null>(null);

  const [options, setOptions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps'))
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );

    loaded.current = true;
  }

  const getPlacePredictions = useMemo(
    () =>
      debounce((request, callback) => {
        if (window.google) {
          if (!autoCompleteService) {
            autoCompleteService = new google.maps.places.AutocompleteService();
          }
          autoCompleteService.getPlacePredictions(request, callback);
        }
      }, 200),
    [],
  );

  const setSelectedPlaceDetails = async (
    selectedPlace: google.maps.places.AutocompletePrediction | null,
  ) => {
    if (selectedPlace && selectedPlace.place_id) {
      const [placeDetails] = await geocodeByPlaceId(selectedPlace.place_id);

      onChangeSelectedPlace(placeDetails || null);
    }
  };

  useEffect(() => {
    setSelectedPlaceDetails(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    getPlacePredictions(
      { input: inputValue },
      (results: google.maps.places.AutocompletePrediction[]) => {
        if (active) {
          let newOptions: google.maps.places.AutocompletePrediction[] = [];
          if (value) newOptions = [value];
          if (results) newOptions = [...newOptions, ...results];
          setOptions(newOptions);
        }
      },
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, getPlacePredictions]);

  return (
    <Autocomplete
      id="autocomplete"
      getOptionLabel={option =>
        typeof option === 'string' ? option : option.description
      }
      noOptionsText="Nenhuma endereço encontrado..."
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(_, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      renderInput={params => customRenderInput(params)}
      renderOption={option => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default AddressInput;
